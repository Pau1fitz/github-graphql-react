import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import moment from 'moment'

const Issues = ({ data: { viewer }}) => {

  const issues = viewer && viewer.issues ? viewer.issues.edges.map(issue => (

    <IssueCard key={ issue.node.publishedAt }>
      <Icon className="fa fa-exclamation-circle" aria-hidden="true" />
      <IssueDetails>
        <NameWithOwner>{ issue.node.repository.nameWithOwner }</NameWithOwner> <span>{ issue.node.title }  </span>
        <IssueInfo>opened on {`${ moment(issue.node.publishedAt).format("ddd MMM YYYY") }`} by {`${ issue.node.author.login }`}</IssueInfo>
      </IssueDetails>
    </IssueCard>
  )
) : []

  const openIssues = viewer && viewer.issues ? viewer.issues.edges.filter(pr => {
    return pr.node.state === 'OPEN'
  }).length : null

  const closedIssues = viewer && viewer.issues ? viewer.issues.edges.filter(pr => {
    return pr.node.state === 'CLOSED'
  }).length : null

  return (
    <div>
      <IssueCountBG>
        <IssueCount>{ openIssues ? `${openIssues} Open` : null}</IssueCount><IssueCount>{ closedIssues ? `${closedIssues} Closed` : null}</IssueCount>
      </IssueCountBG>
      <IssueContainer>
        { issues }
      </IssueContainer>
    </div>
  )
}

const IssueContainer = styled.section`
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #e1e4e8;
  border-right: 1px solid #e1e4e8;
  border-top: 1px solid #e1e4e8;
`

const IssueCountBG = styled.div`
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
const IssueCount = styled.span`
  font-size: 14px;
  :last-child {
    margin-left: 10px;
  }
`

const IssueCard = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e4e8;
`

const IssueInfo = styled.p`
  font-size: 12px;
  color: #586069;
`

const IssueDetails = styled.div`
  padding: 8px;
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
      issues(first: 10) {
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
`)(Issues)