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

const Home = ({ avatarUrl, userFullName, username, location, company }) => {
  return (
    <ProfileContainer>

      <Profile
        avatarUrl={ avatarUrl }
        userFullName={ userFullName }
        username={ username }
        location={ location }
        company={ company }
      />

      <div>
        <ProfileMenu />
        <InformationContainer>
          <Route exact path="/" component={Overview}/>
          <Route path="/repositories" component={Repositories}/>
          <Route path="/followers" component={Followers}/>
          <Route path="/following" component={Following}/>
          <Route path="/stars" component={Stars}/>
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

    return (
      <section>
        <Nav 
          avatarUrl={ avatarUrl }
          username={ username }
        />
        <Switch>
          <Route path="/issues" component={Issues}/>
          <Route path="/pullrequests" component={PullRequests}/>
          <Route path="/marketplace" component={MarketPlace}/>
          <Route path="/" render={()=><Home
            avatarUrl={ avatarUrl }
            userFullName={ userFullName }
            username={ username }
            location={ location }
            company={ company }
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
    }
  }
`)(App)
