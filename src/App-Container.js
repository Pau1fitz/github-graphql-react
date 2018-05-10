import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import Profile from './Profile'
import Overview from './Overview'
import Repositories from './Repositories'
import Followers from './Followers'
import Following from './Following'
import ProfileMenu from './ProfileMenu'
import PullRequests from './PullRequests'
import Issues from './Issues'
import Stars from './Stars'
import MarketPlace from './MarketPlace'

const Home = ({ avatarUrl, userFullName, username, location, company, bio }) => {
  return (
    <ProfileContainer>

      <Profile
        avatarUrl={ avatarUrl }
        userFullName={ userFullName }
        username={ username }
        location={ location }
        company={ company }
        bio={ bio }
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
    }
  }
`)(App)
