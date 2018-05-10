import React, { Component } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import UserMenu from './UserMenu'
import Search from './Search'
import Avatar from "./Avatar";

const activeStyles = () => (
  {
    fontWeight: '600',
    color: '#fff'
   }
)

const linkstyles = () => (
  {
    color: 'rgba(255,255,255,0.75)',
    textDecoration:'none'
  }
)

class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), true);
  }

  handleClickOutside(e) {

    const domNode = document.getElementById('dropdown-menu');

    if (domNode && !domNode.contains(e.target)) {
      this.setState({
        menuOpen: false
      });
    }
  }

  openMenu = () => {
    this.setState({
      menuOpen: true
    })
  }

  closeMenu = () => {
    this.setState({
      menuOpen: false
    })
  }

  render() {

    const { menuOpen } = this.state
    const { avatarUrl, username } = this.props

    return (
      <HeaderContainer>
        <Header>
          <NavLink to={`${process.env.PUBLIC_URL}/`} >
            <Logo 
              height="32" 
              viewBox="0 0 16 16" 
              width="32">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </Logo>
          </NavLink>

          <Search />
  
          <NavContainer>
  
            <NavLink 
              style={ linkstyles() }
              activeStyle={ activeStyles() }
              to={`${process.env.PUBLIC_URL}/pullrequests`}>
              <NavItem>Pull Requests</NavItem>
            </NavLink>

            <NavLink 
              style={ linkstyles() }
              activeStyle={ activeStyles() }
              to={`${process.env.PUBLIC_URL}/issues`}>
              <NavItem>Issues</NavItem>
            </NavLink>

            <NavLink 
              style={ linkstyles() }
              activeStyle={ activeStyles() }
              to={`${process.env.PUBLIC_URL}/marketplace`}>
              <NavItem>Marketplace</NavItem>
            </NavLink>

            <NavItem>Explore</NavItem>
          </NavContainer>
  
          <UserSection>
            <Avatar onClick={ this.openMenu } />
            <DropDownCaret onClick={ this.openMenu } />
            {menuOpen && (
              <UserMenu 
                id={ 'dropdown-menu' } 
                username={ username } 
                closeMenu={ this.closeMenu }
              />
            )}
          </UserSection>
        </Header>
  
      </HeaderContainer>
    )

  }
}

const HeaderContainer = styled.section`
  color: rgba(255,255,255,0.75);
  background-color: #24292e;
  margin-bottom: 24px;
  position: relative;
`

const Header = styled.header`
  max-width: 1012px;
  margin: 0 auto;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  align-items: center;
`

const Logo = styled.svg`
  fill: #fff;
`

const NavContainer = styled.div`
  display: flex;
`

const NavItem = styled.li`
  padding: 0 12px;
  background-color: #24292e;
  list-style: none;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`

const UserSection = styled.div`
  position: relative;
`

const DropDownCaret = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: middle;
  content: "";
  border: 4px solid;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  cursor: pointer;
`

export default withRouter(Nav)