import React from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { NavLink } from 'react-router-dom'

const activeStyles = () => (
  {
    fontWeight: '600',
    borderBottom: '2px solid #e36209',
    color: '#24292e'
   }
)

const Linkstyles = () => (
  {
    padding:'16px 8px',
    marginRight: '16px',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#586069',
    textAlign: 'center',
    textDecoration:'none'
  }
)

const ProfileMenu = ({data: { viewer }}) => (
 
  <Nav> 
    <NavLink 
      style={ Linkstyles() }
      activeStyle={ activeStyles() }
      exact
      to={`${process.env.PUBLIC_URL}/`} >Overview
    </NavLink>

    <NavLink 
      style={ Linkstyles() }
      activeStyle={ activeStyles() }
      exact
      to={`${process.env.PUBLIC_URL}/repositories`} >Repositories
      <Counter>{ viewer && viewer.repositories ? viewer.repositories.totalCount : null}</Counter>  
    </NavLink>
    
    <NavLink 
      style={ Linkstyles() }
      activeStyle={ activeStyles() }
      exact
      to={`${process.env.PUBLIC_URL}/stars`} >Stars
      <Counter>{ viewer && viewer.starredRepositories ? viewer.starredRepositories.totalCount : null}</Counter>  
    </NavLink>
      
    <NavLink 
      style={ Linkstyles() }
      activeStyle={ activeStyles() }
      to={`${process.env.PUBLIC_URL}/followers`} >Followers
        <Counter>{ viewer && viewer.followers ? viewer.followers.totalCount : null}</Counter>
    </NavLink>

    <NavLink 
      style={ Linkstyles() }
      activeStyle={ activeStyles() }
      exact
      to={`${process.env.PUBLIC_URL}/following`} >Following
      <Counter>{ viewer && viewer.following ? viewer.following.totalCount : null}</Counter>  
    </NavLink>

  </Nav>
)

const Nav = styled.nav`
  border-bottom: solid 1px #d1d5da;
  padding-bottom: 14px;
`

const Counter = styled.span`
  padding: 2px 5px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  color: #586069;
  background-color: rgba(27,31,35,0.08);
  border-radius: 20px;
  margin-left: 6px;
`

export default graphql(gql`
query {
  viewer {
    repositories {
      totalCount
    }
    followers {
      totalCount
    }
    following {
      totalCount
    }
    starredRepositories{
      totalCount
    }
  }
}
`)(ProfileMenu)