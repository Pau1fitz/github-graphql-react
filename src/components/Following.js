import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import LoadingIndicator from './LoadingIndicator'

const Following = ({ data: { viewer }}) => {

  const follow = viewer && viewer.following ? viewer.following.edges.map((follower, i) => {

    return (
      <FollowersCard key={ i }>
        <FollowersContainer>

          <FollowersImage src={follower.node.avatarUrl} />

          <FollowersInfoContainer>

            <FollowersName>
              <FollowerName>{ follower.node.name }</FollowerName>
              <FollowerLogin>{ follower.node.login }</FollowerLogin>
            </FollowersName>

            <FollowerBio>{ follower.node.bio }</FollowerBio>
            {follower.node.location && (
            <div>
              <Icon className="fa fa-map-marker"></Icon>
              <FollowerLocation>{ follower.node.location }</FollowerLocation>
            </div>
            )}
          </ FollowersInfoContainer>
        </FollowersContainer> 

      </FollowersCard>
    )
}) : <LoadingIndicator/>

  return (
    <section>
      { follow }
    </section>
  )
}


const Icon = styled.i`
  font-size: 18px;
  margin-left: 4px;
`

const FollowersContainer = styled.div`
  display: flex;
`

const FollowersInfoContainer = styled.div`
  font-size: 12px;
`

const FollowersName = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 4px;
`

const FollowersImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 3px;
  margin-right: 5px;
`

const FollowersCard = styled.div`
  border-bottom: 1px #d1d5da solid;
  padding: 16px;
  margin-bottom: 16px;
`

const FollowerName = styled.p`
  font-size: 16px;
  color: #24292e;
  padding-left: 4px;
  margin-bottom: 0;
`

const FollowerLogin = styled.p`
  font-size: 14px;
  margin-bottom: 0;
  color: #586069;
  padding-left: 4px;
  position: relative;
  top: -1px;
`

const FollowerLocation = styled.p`
  font-size: 14px;
  color: #586069;
  padding-left: 4px;
  display: inline-block;
  margin-bottom: 4px;
`

const FollowerBio = styled.p`
  font-size: 14px;
  color: #586069;
  padding-left: 4px;
  margin-bottom: 4px;
`

export default graphql(gql`
query {
    viewer {
      following(first:100) {
        totalCount
        edges {
          node {
            avatarUrl
            name
            login
            location
            bio
            
          }
        }
      }
    }
  }
`)(Following)
  