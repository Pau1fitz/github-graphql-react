import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import styled from 'styled-components'
import LoginScreen from './components/LoginScreen'
import Nav from './components/Nav'
import AppContainer from './components/App-Container'
import {
  Loading
} from 'gitstar-components'

const STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  FINISHED_LOADING: "finished_loading",
  AUTHENTICATED: "authenticated"
};

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const AUTH_API_URI = process.env.REACT_APP_AUTH_API_URI;

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    const token = localStorage.getItem("github_token");
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    }
  }
});

class App extends Component {

  state = {
    status: STATUS.INITIAL,
    token: null
  };

  componentDidMount() {
    const storedToken = localStorage.getItem("github_token");
    if (storedToken) {
      this.setState({
        token: storedToken,
        status: STATUS.AUTHENTICATED
      });
      return;
    }
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      this.setState({ status: STATUS.LOADING });
      fetch(`${AUTH_API_URI}${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          localStorage.setItem("github_token", token);
          this.setState({
            token,
            status: STATUS.FINISHED_LOADING
          });
        });
    }
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <section>
          { this.state.status === STATUS.AUTHENTICATED && (
            <AppContainer />
          )}
          
          <header>
           { this.state.status === STATUS.INITIAL && (
            <LoginScreen />
           )}
          </header>
          <Loading
            status={this.state.status}
            callback={() => {
              if (this.props.status !== STATUS.AUTHENTICATED) {
                this.setState({
                  status: STATUS.AUTHENTICATED
                });
              }
            }}
          />
        </section>
      </ApolloProvider>
    );
  }
}

const ProfileContainer = styled.section`
  display: flex;
  max-width: 1012px;
  margin: 0 auto;
`

export default App;