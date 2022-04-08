import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-start;
`;

export const UserContainer = styled.div`
    padding: 24px 40px 30px 40px;
    border-radius: 0px 42px 0px 42px;
    background-color: #1C2146;
    display: flex;
    flex-direction: column;
`;

export const UserIcon = styled.div`
    width: 49px;
    height: 49px;
    background-color: #6371EC;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 29px;
`;

export const UserTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const UserTitle = styled.h4`
    font-size: 21px;
    color: #fff;
    margin: 0;
`;

export const UserName = styled.span`
    font-size: 13px;
    margin: 0;
    color: #656C9E;
`;

export const UserBadge = styled.div`
    width: 20px;
    height: 20px;
    margin-left: 9px;
    color: #7884F3;
`;

export const Sections = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
`;

export const FirstSection = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const SecondSection = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FollowersLabel = styled.h5`
    margin: 0;
    color: #fff;
    font-size: 11px;
`;

export const JoinedLabel = styled.h5`
    margin: 0;
    margin-top: 14px;
    font-size: 11px;
    color: #656C9E;
`;

export const BadgesContainer = styled.div`
    margin: 0;
    display: flex;
    flex-direction: row;
`;

export const Badge = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 16px;
`;

export const BadgeIcon = styled.span`
    border-radius: 4px;
    background-color: ${props => props.color ? props.color : '#7884F3'};
    width: 10px;
    height: 10px;
`;

export const BadgeLabel = styled.p`
    margin: 0;
    margin-left: 5px;
    font-size: 11px;
`;

export const StatusLabel = styled.h5`
    margin: 0;
    margin-top: 14px;
    font-size: 11px;
    color: #656C9E;
`;

export const BottomContainer = styled.div`
    border-radius: 42px 0px 42px 0px;
    padding: 41px;
    background-color: #1C2146;
    display: flex;
    flex-direction: column;
    justify-content: space-start;
    margin-top: 30px;
    flex: 1;
`;

export const TrendTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TrendTitle = styled.h4`
    color: #fff;
    margin: 2px 0px;
    font-size: 21px;
`;

export const TrendIcon = styled.span`
    color: #656C9E;
    width: 16px;
    height: 16px;
`;

export const TrendSubtitle = styled.h5`
    color: #fff;
    margin: 2px 0px;
    font-size: 13px;
`;

export const TrendCategories = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 31px;
`;

export const TrendCategory = styled.div`
    height: 43px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 12px;
`;

export const TrendCategoryTitle = styled.h4`
    margin: 0;
    font-size: 13px;
    color: #fff;
`;

export const TrendCategorySubtitle = styled.h4`
    margin: 0;
    font-size: 12px;
    color: #656C9E;
`;

export const RecentActivityContainer = styled.div`
`;

export const RecentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 22px;
`;

export const Recent = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
`;

export const RecentIcon = styled.div`
    width: 30px;
    height: 30px;
    background-color: #6371EC;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4px;
`;

export const RecentInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 12px;
`;

export const RecentUser = styled.h5`
    margin: 0;
    font-size: 11px;
    color: #7884F3;
    font-weight: 500;
`;

export const RecentComment = styled.h5`
    margin: 0;
    font-size: 11px;
    color: #656C9E;
    font-weight: 500;
`;

export const RecentTime = styled.small`
    font-size: 7px;
    color: #656C9E;
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 57px;
`;

export const FooterSection = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

export const FooterLink = styled.p`
    margin: 0;
    margin-bottom: 10px;
    font-size: 13px;
    color: #656C9E;
`;