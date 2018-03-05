import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Repo = ({ data: { viewer }}) => {

  const repos = viewer ? viewer.repositories.edges.map(repo => {
    return (
      <p>{ repo.node.name }</p>
    )
  }) : []
  return (
    <section>

      { repos }
  
    </section>
  )
}

export default graphql(gql`
query {
  viewer {
    repositories(first:6, orderBy: {field: STARGAZERS, direction: DESC}) {
      edges {
        node {
          name
          description   
          stargazers {
            totalCount
          }
        }
      }
    }
  }
}
`)(Repo)