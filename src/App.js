import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Route } from 'react-router-dom'

import Nav from './components/Nav'
import Profile from './components/Profile'
import Repositories from './components/Repositories'
import Followers from './components/Followers'
import ProfileMenu from './components/ProfileMenu'

const App = ({ data: { viewer }}) => {

  const avatarUrl = viewer ? viewer.avatarUrl : ''
  const userFullName = viewer ? viewer.name : ''
  const username = viewer ? viewer.login : ''
  const location = viewer ? viewer.location : ''
  const company = viewer ? viewer.company : ''

  return (
    <section>
      <Nav
        avatarUrl={ avatarUrl }
      />


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
            <Route path="/repositories" component={Repositories}/>
            <Route path="/followers" component={Followers}/>
          </InformationContainer>
        </div>
        
      </ProfileContainer>
    </section>
  )
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