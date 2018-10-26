import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import LoadingIndicator from './LoadingIndicator'
import GitHubCalendar from 'github-calendar'

class Overview extends Component {

  componentDidMount() {
    if(this.props.data && this.props.data.viewer) {
      new GitHubCalendar('.calendar', this.props.data.viewer.login)
    }
  }

  componentWillReceiveProps(nextProps) {
    new GitHubCalendar('.calendar', nextProps.data.viewer.login)
  }

  render() {

    const { viewer } = this.props.data
  
    const repos = viewer && viewer.repositories ? viewer.repositories.edges.map((repo , i) => {
      // Only show 6 repos
      if(i < 6) {
        return (
          <RepoCard key={ repo.node.name }>
            <RepoLink href={ `https://www.github.com/${viewer.login}/${repo.node.name}` }>{ repo.node.name }</RepoLink>
            <RepoDescription>{ repo.node.description }</RepoDescription>
            <RepoInfoContainer>
              <Circle />
              <RepoDetails>{ repo.node.languages.edges && repo.node.languages.edges[0] && repo.node.languages.edges[0].node.name && repo.node.languages.edges[0].node.name } <Icon className="fa fa-star" aria-hidden="true" /> { repo.node.stargazers.totalCount } <Icon className="fa fa-code-fork" aria-hidden="true" /> { repo.node.forkCount }</RepoDetails>
            </RepoInfoContainer>
          </RepoCard>
        )
      } else {
        return null
      }
    }) : <LoadingIndicator />
  
    return (
      <div>
        { repos.length > 1 && (
          <OverviewTitle>Popular Repositories</OverviewTitle>
        )}
        <RepoContainer>
          { repos }
        </RepoContainer>

        <CalendarContainer>
          <div className="calendar" />
        </CalendarContainer>
       
      </div>
    )
  }
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
  margin: 4px 0 10px 0;
`

const RepoInfoContainer = styled.div`
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

const OverviewTitle = styled.p`
  color: #24292e;
  font-size: 16px;
  margin-bottom: 8px;
`

const RepoLink = styled.a`
  font-weight: 600;
  font-size: 14px;
  color: #0366d6;
  cursor: pointer;
`

const RepoDetails = styled.p`
  color: #586069;
  font-size: 12px;
  margin: 0;
`

const Icon = styled.i`
  margin-left: 16px;
`

const CalendarContainer = styled.div`
  position: relative;
`

export default graphql(gql`
query {
  viewer {
    login
    repositories(first:100, orderBy: {field: STARGAZERS, direction: DESC}) {
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
          forkCount
          stargazers {
            totalCount
          }
        }
      }
    }
  }
}
`)(Overview)
