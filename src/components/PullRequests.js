import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import moment from 'moment'

const PullRequests = ({ data: { viewer }}) => {
  const prs = viewer && viewer.pullRequests ? viewer.pullRequests.edges.map(pr => (

    <PRCard key={ pr.node.publishedAt }>
      <Icon className="fa fa-code-fork" aria-hidden="true" />
      <div>
        <p>{ pr.node.repository.nameWithOwner }</p>
        <PRDetails>opened on {`${ moment(pr.node.publishedAt).format("ddd MMM YYYY") }`} by {`${ pr.node.author.login }`}</PRDetails>
      </div>
    </PRCard>
  )
) : []

  return (
    <PRContainer>
      { prs }
    </PRContainer>
  )
}

const PRContainer = styled.section`
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #e1e4e8;
  border-right: 1px solid #e1e4e8;
  border-top: 1px solid #e1e4e8;
`

const PRCard = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e4e8;
  padding: 8px;
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