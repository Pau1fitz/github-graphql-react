import React from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Results = (props) => {
  const data = props && props.data && props.data.search ? props.data.search.edges : [];
  const searchList = data.map(repo => {
    return ( 
      <Link href={`https://github.com/${ repo.node.nameWithOwner}` }>
        <SearchItem key={ repo.node.nameWithOwner }>{ repo.node.nameWithOwner }</SearchItem>
      </Link>
    )
  });
  return (
    <ResultList>
      { searchList }
    </ResultList>
  );

}

const ResultList = styled.ul`
  position: absolute;
  top: 38px;
  left: 15px;
  background-color: #24292e;
  border-radius: 3px;
`

const Link = styled.a`
  color: #fff;
`

const SearchItem = styled.li`
  padding: 10px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color: #24292e;
    background-color: #fff;
  }
`

const ResultsWithQuery = graphql(gql`
query githubSearch($query: String!) {
   search(query: $query, type: REPOSITORY, first: 10) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          nameWithOwner
          stargazers {
            totalCount
          }
        }
      }
    }
   }
}
`, {skip: (ownProps) => !ownProps.query})(Results);


export default ResultsWithQuery;