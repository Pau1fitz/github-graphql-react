import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Repo = ({ data: { viewer }}) => {

  const repos = viewer ? viewer.repositories.edges.map(repo => {
    return (
      <RepoCard key={ repo.node.name }>
        <RepoLink>{ repo.node.name }</RepoLink>
        <RepoDescription>{ repo.node.description }</RepoDescription>
        <RepoDetails>{ repo.node.languages.edges[0].node.name } <i className="fa fa-star" aria-hidden="true"></i> { repo.node.stargazers.totalCount } <i className="fa fa-code-fork" aria-hidden="true"></i> { repo.node.forkCount }</RepoDetails>
      </RepoCard>
    )
  }) : []

  return (
    <RepoContainer>
      { repos }
    </RepoContainer>
  )
}

const RepoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const RepoCard = styled.div`
  border: 1px #d1d5da solid;
  padding: 16px;
  width: 362px;
  margin-bottom: 16px;
`

const RepoDescription = styled.p`
  font-size: 12px;
  color: #586069;
`

const RepoLink = styled.a`
  font-weight: 600;
  font-size: 14px;
  color: #0366d6;
`

const RepoDetails = styled.span`
  color: #586069;
  font-size: 12px;
`

export default graphql(gql`
query {
  viewer {
    repositories(first:6, orderBy: {field: STARGAZERS, direction: DESC}) {
      edges {
        node {
          name
          description 
          languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              node {
                name
              }
            }
          }  
          forkCount
          stargazers {
            totalCount
          }
        }
      }
    }
  }
}
`)(Repo)