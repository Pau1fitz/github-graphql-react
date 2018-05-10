import React from 'react'
import styled from 'styled-components'

const Profile = ({ avatarUrl, userFullName, username, company, location, bio }) => (
  <ProfileSection>
      { avatarUrl === '' ? <Placeholder /> :  <ProfilePic src={ avatarUrl  } /> } 
    <NameSection>
      <UsersFullName>{ userFullName }</UsersFullName>
      <UsersName>{ username }</UsersName>
    </NameSection>

    <BioContainer>
      { bio ? bio : '' }
    </BioContainer>

    <ProfileDivider />

    <LocationSection>
        {company && (
          <div>
            <Icon className="fa fa-user" aria-hidden="true" /><Organisation>{ company }</Organisation>
          </div>
        )}
        {location && (
          <div>
            <Icon className="fa fa-map-marker" aria-hidden="true" /><Location>{ location }</Location>
          </div>
        )}
    </LocationSection>

    <ProfileDivider /> 
  </ProfileSection>
)


const ProfileSection = styled.section`
  padding-right: 20px;
`

const NameSection = styled.div`
  padding: 16px 0;
`

const LocationSection = styled.div`
  padding: 16px 0;
`

const ProfileDivider = styled.div`
  height: 1px;
  margin: 8px 1px;
  background-color: #e1e4e8;
`

const UsersFullName = styled.p`
  font-weight: 600;
  font-size: 26px;
  line-height: 30px;
  margin: 0;
`

const UsersName = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  color: #666;
  margin: 0;
`

const ProfilePic = styled.img`
  border-radius: 6px;
  height: 230px;
  width: 230px;
`

const Placeholder = styled.div`
  border-radius: 6px;
  height: 230px;
  width: 230px;
  background: #fff;
`

const Organisation = styled.p`
  font-weight: 600;
  font-size: 14px;
  margin: 0;
`

const Location = styled.p`
  font-size: 14px;
  margin: 0;
`

const Icon = styled.i`
  float: left;
  margin-right: 6px;
  margin-top: 3px;
`

const BioContainer = styled.div`
  margin-bottom: 12px;
  max-width: 230px;
  font-size: 14px;
  color: #6a737d;
`
export default Profile
