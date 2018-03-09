import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import Repositories from './Repositories'
import Followers from './Followers'
import Profile from './Profile'
import ProfileMenu from './ProfileMenu'

const X = ({ avatarUrl, userFullName, username, company, location }) => {
  
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
        <Route path="/repositories" component={Repositories}/>
        <Route path="/followers" component={Followers}/>
      </InformationContainer>
    </div>
    
  </ProfileContainer>
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

export default X
