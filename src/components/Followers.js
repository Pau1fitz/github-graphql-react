import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Followers = ({ data: { viewer }}) => {
  
  const followers = viewer ? viewer.followers.edges.map(follower => {

    console.log(follower)
    return (
      <FollowersCard key={ follower.node.name }>
        <FollowerDetailsContainer>
          <FollowersImage src={follower.node.avatarUrl} />
          <FollowerName>{ follower.node.name }</FollowerName>
          <FollowerLogin>{ follower.node.login }</FollowerLogin>
        </FollowerDetailsContainer> 
        <FollowerLocation>{ follower.node.location }</FollowerLocation>
      </FollowersCard>
    )
  }) : []

  return (
    <FollowersContainer>
      { followers }
    </FollowersContainer>
  )
}

const FollowersContainer = styled.div`

`

const FollowerDetailsContainer = styled.div`
  display: flex;
`

const FollowersImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 3px;
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
`

const FollowerLogin = styled.p`
  font-size: 14px;
  color: #586069;
  padding-left: 4px;
`

const FollowerLocation = styled.p`
  font-size: 14px;
  color: #586069;
  padding-left: 4px;
`

const FollowersLink = styled.a`
  font-weight: 600;
  font-size: 14px;
  color: #0366d6;
`

const FollowersDetails = styled.span`
  color: #586069;
  font-size: 12px;
`

export default graphql(gql`
query {
    viewer {
      followers(first:6) {
        edges {
          node {
            avatarUrl
            name
            login
            location
          }
        }
      }
    }
  }
`)(Followers)
  