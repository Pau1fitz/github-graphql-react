import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import moment from 'moment'
import LoadingIndicator from './LoadingIndicator'

class Stars extends Component {

  state = {
    starredRepositories: [],
    filteredRepos: [],
    filtered: false
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.viewer.starredRepositories) {
      this.setState({
        starredRepositories: nextProps.data.viewer.starredRepositories.nodes
      })
    }
  }

  searchRepos = (e) => {

    const repos = this.state.starredRepositories.filter(repo => {
      if(repo.name.indexOf(e.target.value) > -1) {
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

    const { starredRepositories, filteredRepos, filtered } = this.state;

    const visibleRepos = filtered ? filteredRepos : starredRepositories

    const repositories = starredRepositories.length > 0 ? visibleRepos.map((star, i) => {

      return (
        <StarCard key={ star.nameWithOwner }>
          <Link href={ `https://www.github.com/${star.nameWithOwner}`}>
            <Name>{ star.owner.login }</Name> / <Owner>{ star.name }</Owner>
          </Link>
          <StarDescription>{ star.description }</StarDescription>
          <InfoContainer>
            <Circle />  
            <Language>{ star.languages.edges[0] && star.languages.edges[0].node && star.languages.edges[0].node.name ? star.languages.edges[0].node.name : null  }</Language>
            <Icon className="fa fa-star" aria-hidden="true"></Icon><Count>{ star.stargazers.totalCount.toLocaleString() }</Count>
            <Icon className="fa fa-code-fork" aria-hidden="true"></Icon><Count>{ star.forkCount.toLocaleString() }</Count>
            <Date>{  moment(star.updatedAt).fromNow()}</Date>
          </InfoContainer>
        </StarCard>
      )
    }) : <LoadingIndicator />
  
    return (
      <section>
        { starredRepositories.length > 0
          && (
          <SearchContainer>
          <SearchBox 
              type='text' 
              onChange={this.searchRepos} 
              placeholder='Search starred repositories...'
            />
          </SearchContainer>
            
          )
        }
        { repositories }
      </section>
    )
  }
  
}

const StarCard = styled.div`
  border-bottom: 1px #d1d5da solid;
  padding: 16px;
  margin-bottom: 16px;
`

const StarDescription = styled.p`
  font-size: 14px;
  color: #586069;
  margin: 4px 0 8px 0;
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


const Language = styled.span`
  margin-right: 10px;
`

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  color: #586069;
  font-size: 12px;
`

const Icon = styled.i`
  margin-right: 3px;
  color: #586069;
`

const Date = styled.p`
  font-size: 12px;
  color: #586069;
`

const Count = styled.p`
  font-size: 12px;
  color: #586069;
  margin-right: 12px;
`

const Name = styled.span`
  font-size: 20px;
`

const Owner = styled.span`
  font-weight: 600;
  font-size: 20px;
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

const Link = styled.a`
  color: #0566D9;
`

export default graphql(gql`
{
  viewer {
    starredRepositories(first: 100) {
      totalCount
      nodes {
        name
        nameWithOwner
        description
        forkCount
        updatedAt
        languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
          edges {
            node {
              name
            }
          }
        }  
        owner {
          login
        }
        stargazers {
          totalCount
        }
      }
    }
  }
}
`)(Stars)
  