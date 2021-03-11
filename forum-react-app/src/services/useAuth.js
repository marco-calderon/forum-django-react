import { useCallback, useEffect, useState } from 'react';
import { gql, useApolloClient } from '@apollo/client';

const LOG_IN = gql`
    mutation ($username: String!, $password: String!) {
        tokenAuth(
            username: $username,
            password: $password
        ) {
            token, payload, refreshExpiresIn
        }
    }
`;

const GET_USER = gql`
    query {
        user {
            id,
            username
        }
    }
`;

const REFRESH_TOKEN = gql`
    mutation ($token: String!) {
        refreshToken(token: $token) {
            token
            payload
            refreshExpiresIn
        }
    }
`;

export const isTokenAboutToExpire = () => {
    const expiresAt = localStorage.getItem('expiresAt');
    let expiresAtDate = null;
    const now = new Date();

    if (expiresAt) {
        expiresAtDate = new Date(parseInt(expiresAt));
    }
    else {
        expiresAtDate = new Date();
    }

    // Substract 3 minutes from date.
    expiresAtDate.setMinutes(expiresAtDate.getMinutes() - 3);

    return now.valueOf() > expiresAtDate.valueOf();
}

export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expiresAt');
    let expiresAtDate = null;
    const now = new Date();

    if (expiresAt) {
        expiresAtDate = new Date(parseInt(expiresAt));
    }
    else {
        expiresAtDate = new Date();
    }

    if (token && now.valueOf() <= expiresAtDate.valueOf()) {
        return true;
    }
    return false;
}

const useAuth = (props) => {
    const client = useApolloClient();
    const [user, setUser] = useState(null);

    const checkToken = async () => {
        if (isTokenAboutToExpire()) {
            refreshToken();
        }
    }

    const logIn = async (username, password) => {
        const { data } = await client.mutate({
            mutation: LOG_IN,
            variables: {
                username,
                password
            }
        });

        let expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 15);

        if (data.tokenAuth) {
            let refreshTokenDate = new Date();
            refreshTokenDate.setMinutes(refreshTokenDate.getMinutes() + 12);

            localStorage.setItem('token', data.tokenAuth.token);
            localStorage.setItem('payload', data.tokenAuth.payload);
            localStorage.setItem('expiresAt', expiresAt.valueOf());
            return true;
        }
        else {
            return false;
        }
    }

    const logOut = async => {
        localStorage.removeItem('token');
        localStorage.removeItem('payload');
        localStorage.removeItem('expiresAt');
        setUser(null);
    }

    const getUser = async () => {
        // Use cached user first if available.
        if (user) {
            return user;
        }

        const { data } = await client.query({
            query: GET_USER
        });
        setUser(data.user);
        return data.user;
    }

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        const expiresAt = localStorage.getItem('expiresAt');
        let expiresAtDate = null;
        const now = new Date();

        if (expiresAt) {
            expiresAtDate = new Date(parseInt(expiresAt));
        }
        else {
            expiresAtDate = new Date();
        }

        if (token && now.valueOf() <= expiresAtDate.valueOf()) {
            return true;
        }
        return false;
    }

    const refreshToken = async () => {
        const token = localStorage.getItem('token');

        const { data } = await client.mutate({
            mutation: REFRESH_TOKEN,
            variables: {
                token
            }
        });

        let expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 15);

        let refreshTokenDate = new Date();
        refreshTokenDate.setMinutes(refreshTokenDate.getMinutes() + 12);

        if (data.refreshToken) {
            localStorage.setItem('token', data.refreshToken.token);
            localStorage.setItem('payload', data.refreshToken.payload);
            localStorage.setItem('expiresAt', expiresAt.valueOf());
        }
    }

    const memoGetUser = useCallback(getUser, [client, user]);
    const memoIsLoggedIn = useCallback(isLoggedIn, []);
    const memoRefreshToken = useCallback(refreshToken, [client]);

    useEffect(() => {
        // Restart timer if refresh has been reset
        if (memoIsLoggedIn()) {
            memoGetUser();

            const now = new Date();
            const expiresAt = localStorage.getItem('expiresAt');
            let expiresAtDate = new Date();

            if (expiresAt) {
                expiresAtDate = new Date(parseInt(expiresAt));
            }

            expiresAtDate.setMinutes(expiresAtDate.getMinutes() - 3);
            if (now.valueOf() > expiresAtDate.valueOf()) {
                memoRefreshToken();
            }
            else {
            }
        }
    }, [memoIsLoggedIn, memoGetUser, memoRefreshToken]);

    return {
        logIn,
        logOut,
        isLoggedIn,
        getUser,
        refreshToken,
        checkToken
    }
}

export default useAuth;