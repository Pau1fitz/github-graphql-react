import React from 'react'
import styled from 'styled-components'

const Profile = ({ avatarUrl, userFullName, username, company, location }) => {
  
  return (
    <ProfileSection>
      <ProfilePic src={ avatarUrl } />
      <UsersFullName>{ userFullName }</UsersFullName>
      <UsersName>{ username }</UsersName>
      <Organisation>{ company }</Organisation>
      <Location>{ location }</Location>
    </ProfileSection>
  )
}

const ProfileSection = styled.section`
  padding-right: 16px;
`

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

const Organisation = styled.p`
  font-weight: 600;
  font-size: 14px;
`

const Location = styled.p`
  font-size: 14px;
`

export default Profile
