import React from "react"
import { gql } from "apollo-boost"
import { Query } from "react-apollo"
import styled from 'styled-components'

const GET_AVATAR = gql`
  query {
    viewer {
      avatarUrl
    }
  }
`

class UserAvatar extends React.Component {
  render() {
    return (
      <Query query={GET_AVATAR}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;

          return <ProfilePic src={data.viewer.avatarUrl} />;
        }}
      </Query>
    )
  }
}


const ProfilePic = styled.img`
  border-radius: 3px;
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin-right: 4px;
  margin-top: 8px;
`

export default UserAvatar
