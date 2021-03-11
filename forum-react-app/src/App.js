import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import LoginPage from './pages/LoginPage';
import ContainerPage from "./pages/ContainerPage";
import { getMockedClient } from "./services/graphql";

const mockedClient = getMockedClient();

function App() {
  return (
    <ApolloProvider client={mockedClient}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/forum"></Redirect>
          </Route>
          <Route path="/login" component={LoginPage} />
          <Route path="/forum" component={ContainerPage} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
