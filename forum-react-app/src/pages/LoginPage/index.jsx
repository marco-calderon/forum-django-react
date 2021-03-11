import React, { useRef } from 'react';
import useAuth from '../../services/useAuth';
import Icon from '@mdi/react';
import { mdiAccount, mdiLock } from '@mdi/js';
import { Container } from './styles';

const LoginPage = () => {
  const auth = useAuth();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

    const handleSubmitLogin = async () => {
        const validLogin = await auth.logIn(usernameRef.current.value, passwordRef.current.value);
        if (validLogin) {
            window.location.href = '/';
        }
        else {
            // Show error on site
        }
    }

  return (
    <Container>
      <div className="container">
          <div className="row">
              <div className="col-md-5 col-sm-12 mx-auto">
                  <div className="card pt-4">
                      <div className="card-body">
                          <div className="text-center mb-5">
                              <h3>Sign in to the Forum</h3>
                          </div>
                        <div className="form-group position-relative has-icon-left">
                        <label>Username</label>
                        <div className="position-relative">
                            <input ref={usernameRef} type="text" className="form-control" id="username" />
                            <div className="form-control-icon">
                                <Icon path={mdiAccount} size={1} />
                            </div>
                        </div>
                        </div>
                        <div className="form-group position-relative has-icon-left">
                        <div className="clearfix">
                            <label>Password</label>
                            <a href="auth-forgot-password.html" className="float-right">
                                <small>Forgot password?</small>
                            </a>
                        </div>
                        <div className="position-relative">
                            <input ref={passwordRef} type="password" className="form-control" id="password" />
                            <div className="form-control-icon">
                                <Icon path={mdiLock} size={1} />
                            </div>
                        </div>
                        </div>
                        <div className="form-check clearfix my-4">
                            <div className="checkbox float-left">
                                <input type="checkbox" id="checkbox1" className="form-check-input" />
                                <label>Remember me</label>
                            </div>
                            <div className="float-right">
                                <a href="auth-register.html">Don't have an account?</a>
                            </div>
                        </div>
                        <div className="clearfix">
                            <button className="btn btn-primary float-right" onClick={handleSubmitLogin}>Submit</button>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </Container>
  );
};

export default LoginPage;
