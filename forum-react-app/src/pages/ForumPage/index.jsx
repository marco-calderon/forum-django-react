import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import HomePage from '../HomePage';
import CategoryPage from '../CategoryPage';
import PostPage from '../PostPage';
import SideBarComponent from '../../components/SideBarComponent';
import { Col, Row } from 'react-bootstrap';
import NavbarComponent from '../../components/NavbarComponent';
import CreatePostPage from '../CreatePostPage';
import { Container } from './styles';
import useTimer from '../../hooks/use-timer';
import useAuth from '../../services/useAuth';

const ForumPage = () => {
  const auth = useAuth();
  const { start, restart } = useTimer({
    onInit: () => {
      let expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 12);
      start(expirationDate);
    },
    onExpire: () => {
      auth.refreshToken();
      let expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 12);
      restart(expirationDate);
    }
  });
  const { path, url } = useRouteMatch();

  return (
    <Container>
      <NavbarComponent />
      <div className="container">
        <Row className="d-flex">
          <Col className="flex-grow-1">
            <Switch>
              <Route exact path={path}>
                <HomePage />
              </Route>
              <Route path={`${path}/category/:slug`}>
                <CategoryPage />
              </Route>
              <Route path={`${path}/post/:id`}>
                <PostPage />
              </Route>
              <Route path={`${path}/create`} component={CreatePostPage} />
            </Switch>
          </Col>
          <Col className="d-sm-none d-md-block" md={3} lg={4}>
            <SideBarComponent />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ForumPage;
