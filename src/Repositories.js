import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import moment from 'moment'
import LoadingIndicator from './LoadingIndicator'

class Repo extends Component {

  state = {
    repos: [],
    filteredRepos: [],
    filtered: false
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.viewer.repositories) {
      this.setState({
        login: nextProps.data.viewer.login,
        repos: nextProps.data.viewer.repositories.edges
      })
    }
  }

  searchRepos = (e) => {

    const repos = this.state.repos.filter(repo => {
      if(repo.node.name.indexOf(e.target.value) > -1) {
        return repo
      } else {
        return null
      }
    })

    this.setState({
      filteredRepos: repos,
      filtered: true
    })
  }

  render() {

    const { repos, login, filteredRepos, filtered } = this.state;

    const visibleRepos = filtered ? filteredRepos : repos

    const repositories = repos.length > 0 ? visibleRepos.map((repo, i) => {
      return (
        <RepoCard key={ i }>
          <RepoLink href={ `https://www.github.com/${login}/${repo.node.name}` }>{ repo.node.name }</RepoLink>
          <RepoDescription>{ repo.node.description }</RepoDescription>
          <InfoContainer>
            <Circle />
            <RepoDetails>{  repo.node.languages.edges && repo.node.languages.edges[0] && repo.node.languages.edges[0].node.name ? repo.node.languages.edges[0].node.name : null} <Icon className="fa fa-star" aria-hidden="true"></Icon> { repo.node.stargazers.totalCount } <Icon className="fa fa-code-fork" aria-hidden="true"></Icon> { repo.node.forkCount }</RepoDetails>
            <Date>{  moment(repo.node.updatedAt).fromNow()}</Date>
          </InfoContainer>
        </RepoCard>
    )
  }) : <LoadingIndicator />
  
    return (
      <div>
        { repos.length > 0
          && (
          <SearchContainer>
          <SearchBox 
              type='text' 
              onChange={this.searchRepos} 
              placeholder='Search repositories...'
            />
          </SearchContainer>
            
          )
        }
        { repositories }
      </div>
    )
  }
}


const RepoCard = styled.div`
  border-bottom: 1px #d1d5da solid;
  padding: 16px;
  margin-bottom: 16px;
`

const SearchContainer = styled.div`
  border-bottom: 1px solid #d1d5da;
  padding-bottom: 16px;

`

const SearchBox = styled.input`
  min-height: 34px;
  width: 300px;
  font-size: 14px;
  padding: 6px 8px;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
`

const Date = styled.p`
  font-size: 12px;
  color: #586069;
  margin-left: 10px;
`

const InfoContainer = styled.div`
  display: flex;
`

const Circle = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #f1e05a;
  margin-right: 5px;
  top: 2px;
  position: relative;
`

const RepoDescription = styled.p`
  font-size: 14px;
  color: #586069;
  margin: 4px 0 10px 0;
`

const RepoLink = styled.a`
  font-weight: 600;
  color: #0366d6;
  cursor: pointer;
  font-size: 20px;
`

const RepoDetails = styled.span`
  color: #586069;
  font-size: 12px;
`

const Icon = styled.i`
  margin-left: 16px;
`

export default graphql(gql`
query {
  viewer {
    login
    repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
      totalCount
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
          updatedAt
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