import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Profile = ({ data: { viewer } }) => {
  console.log(viewer)
  const avatarUrl = viewer ? viewer.avatarUrl : ''
  const userFullName = viewer ? viewer.name : ''
  const username = viewer ? viewer.login : ''
  const location = viewer ? viewer.location : ''
  const company = viewer ? viewer.company : ''
  
  return (
    <ProfileSection>
      <ProfilePic src={ avatarUrl } />
      <UsersFullName>{ userFullName }</UsersFullName>
      <UsersName>{ username }</UsersName>
      <p>{ company }</p>
      <p>{ location }</p>
    </ProfileSection>
  )
}

const ProfileSection = styled.section``

const UsersFullName = styled.p`
  font-weight: 600;
  font-size: 26px;
  line-height: 30px;
`

const UsersName = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  color: #666;
`

const ProfilePic = styled.img`
  border-radius: 6px;
  height: 230px;
  width: 230px;
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
`)(Profile)
