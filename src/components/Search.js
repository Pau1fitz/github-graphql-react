import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import ResultsWithQuery from './Results'

export class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      search: '',
      searchVisible: false
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), true)
  }

  handleClickOutside(e) {

    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(e.target)) {
      this.setState({
        searchVisible: false
      });
    }
  }
  
  updateSearch = (e) => {
    this.setState({
      search: e.target.value,
      searchVisible: true
    })
  }

  setSearchVisible = () => {
    this.setState({
      searchVisible: true
    })
  }
  
  render() {
  
    const { search, searchVisible } = this.state;
  
    return (
      <SearchContainer>
        <form>
          <SearchBar
            type='text'
            onFocus={ this.setSearchVisible }
            onChange={ this.updateSearch }
            value={ search }
            placeholder='Search Github'
          />
          { searchVisible && (
            <ResultsWithQuery query={ search } />
          )}
        </form>
      </SearchContainer>
    )
  }
}

const SearchContainer = styled.div`
  position: relative;
`

const SearchBar = styled.input`
  background: rgb(64, 68, 72);
  padding: 6px 8px;
  border-radius: 3px;
  width: 300px;
  border: none;
  margin-left: 15px;
  font-size: 16px;
  color: #fff;
  font-size: 12px;

  &:focus {
    outline: none;
  }
`

export default Search
