import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const PullRequests = ({ data: { viewer }}) => {

  console.log(viewer)


  const prs = viewer && viewer.pullRequests ? viewer.pullRequests.edges.map(pr => (

    <PRCard key={ pr.node.publishedAt }>
      <Icon className="fa fa-code-fork" aria-hidden="true" />
      <p>{ pr.node.repository.nameWithOwner }</p>
      <PRDetails>opened on {`${ pr.node.publishedAt }`} by {`${ pr.node.author.login }`}</PRDetails>
    </PRCard>

  )
) : []

  return (
    <PRContainer>
      { prs }
    </PRContainer>
  )
}

const PRContainer = styled.div`
`

const PRCard = styled.div`
  border-bottom: 1px solid #e1e4e8;
`

const PRDetails = styled.p`
  font-size: 12px;
  color: #586069;
`

const Icon = styled.i`
  color: #28a745;
  font-size: 20px;
`

export default graphql(gql`
  query {
    viewer {
      pullRequests(first: 10) {
        edges {
          node {
            publishedAt
            state
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