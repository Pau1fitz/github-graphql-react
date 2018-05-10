import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'

import Nav from './components/Nav'
import Profile from './components/Profile'
import Overview from './components/Overview'
import Repositories from './components/Repositories'
import Followers from './components/Followers'
import Following from './components/Following'
import ProfileMenu from './components/ProfileMenu'
import PullRequests from './components/PullRequests'
import Issues from './components/Issues'
import Stars from './components/Stars'
import MarketPlace from './components/MarketPlace'

const Home = ({ avatarUrl, userFullName, username, location, company, bio, organizations }) => {
  return (
    <ProfileContainer>

      <Profile
        avatarUrl={ avatarUrl }
        userFullName={ userFullName }
        username={ username }
        location={ location }
        company={ company }
        bio={ bio }
        organizations={ organizations }
      />

      <div>
        <ProfileMenu />
        <InformationContainer>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Overview}/>
          <Route path={`${process.env.PUBLIC_URL}/repositories`} component={Repositories}/>
          <Route path={`${process.env.PUBLIC_URL}/followers`}  component={Followers}/>
          <Route path={`${process.env.PUBLIC_URL}/following`}  component={Following}/>
          <Route path={`${process.env.PUBLIC_URL}/stars`}  component={Stars}/>
        </InformationContainer>
      </div>
    </ProfileContainer>
  );
};

class App extends Component {

  render() {
    const { viewer } = this.props.data

    const avatarUrl = viewer ? viewer.avatarUrl : ''
    const userFullName = viewer ? viewer.name : ''
    const username = viewer ? viewer.login : ''
    const location = viewer ? viewer.location : ''
    const company = viewer ? viewer.company : ''
    const bio = viewer ? viewer.bio : ''
    const organizations = viewer ? viewer.organizations : {}

    return (
      <section>
        <Nav 
          avatarUrl={ avatarUrl }
          username={ username }
        />
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/issues`} component={Issues}/>
          <Route path={`${process.env.PUBLIC_URL}/pullrequests`} component={PullRequests}/>
          <Route path={`${process.env.PUBLIC_URL}/marketplace`} component={MarketPlace}/>
          <Route path={`${process.env.PUBLIC_URL}/`}  render={()=><Home
            avatarUrl={ avatarUrl }
            userFullName={ userFullName }
            username={ username }
            location={ location }
            company={ company }
            bio={ bio }
            organizations={ organizations }
          />}/>

        </Switch>
      </section>
    )
  }
}

const ProfileContainer = styled.section`
  display: flex;
  max-width: 1012px;
  margin: 0 auto;
  height: 100px;
`

const InformationContainer = styled.section`
  margin-top: 24px;
`

export default graphql(gql`
  query user {
    viewer {
      avatarUrl
      name
      login
      company
      location
      bio
      organizations(first:5) {
        edges {
          node {
            avatarUrl
          }
        }
      }
    }
  }
`)(App)
