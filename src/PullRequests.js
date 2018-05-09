import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import moment from 'moment'

const PullRequests = ({ data: { viewer }}) => {

  const prs = viewer && viewer.pullRequests ? viewer.pullRequests.edges.map(pr => (

    <PRCard key={ pr.node.publishedAt }>
      <Icon className="fa fa-code-fork" aria-hidden="true" />
      <PRDetailsContainer>
        <NameWithOwner>{ pr.node.repository.nameWithOwner }</NameWithOwner> <span>{ pr.node.title }  </span>
        <PRDetails>opened on {`${ moment(pr.node.publishedAt).format("ddd MMM YYYY") }`} by {`${ pr.node.author.login }`}</PRDetails>
      </PRDetailsContainer>
    </PRCard>
    )
  ) : []

  const openPRs = viewer && viewer.pullRequests ? viewer.pullRequests.edges.filter(pr => {
    return pr.node.state === 'OPEN'
  }).length : null

  const closedPRs = viewer && viewer.pullRequests ? viewer.pullRequests.edges.filter(pr => {
    return pr.node.state === 'CLOSED'
  }).length : null

  return (
    <div>
      <PRCountBG>
        <PRCount>{ openPRs ? `${openPRs} Open` : null}</PRCount><PRCount>{ openPRs ? `${closedPRs} Closed` : null}</PRCount>
      </PRCountBG>
      <PRContainer>
        { prs }
      </PRContainer>
    </div>
  )
}

const PRContainer = styled.section`
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #e1e4e8;
  border-right: 1px solid #e1e4e8;
  border-top: 1px solid #e1e4e8;
`

const PRCountBG = styled.div`
  width: 980px;
  margin: 0 auto;
  background: #f6f8fa;
  border-top: 1px solid #e1e4e8;
  border-left: 1px solid #e1e4e8;
  border-right: 1px solid #e1e4e8;
  border-radius: 3px 3px 0 0;
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 16px;
`
const PRCount = styled.span`
  font-size: 14px;
  :last-child {
    margin-left: 10px;
  }
`

const PRCard = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e4e8;
`
const PRDetailsContainer = styled.div`
  padding: 8px;
`
const PRDetails = styled.p`
  font-size: 12px;
  color: #586069;
`

const Icon = styled.i`
  color: #28a745;
  font-size: 20px;
  padding-left: 16px;
  padding-top: 8px;
`

const NameWithOwner = styled.span`
  color: #586069;
  padding-right: 4px;
  font-size: 16px;
`

export default graphql(gql`
  query {
    viewer {
      pullRequests(first: 100) {
        edges {
          node {
            publishedAt
            state
            title
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