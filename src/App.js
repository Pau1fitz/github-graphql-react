import React from 'react';
import Nav from './components/Nav'
import Profile from './components/Profile'

import Repositories from './components/Repositories'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


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
      <Profile 
        avatarUrl={ avatarUrl }
        userFullName={ userFullName }
        username={ username }
        location={ location }
        company={ company }
      />

      <Repositories />
    </section>
  )
}

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