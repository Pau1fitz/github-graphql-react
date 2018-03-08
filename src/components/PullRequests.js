import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const PullRequests = ({ data: { viewer }}) => {

  const prs = <p>hi</p>;

  return (
    <PRContainer>
      { prs }
    </PRContainer>
  )
}

const PRContainer = styled.div`
`

export default graphql(gql`
  query {
    viewer {
      pullRequests(first: 10) {
        edges {
          node {
            publishedAt
            author {
              login
            }
            repository {
              nameWithOwner
            }
          }
        }
      }
    }
  }
`)(PullRequests)