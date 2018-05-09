import React from 'react'
import styled from 'styled-components'
import octocat from './images/octocat.svg'

const LoadingIndicator = () => (
  <OctocatContainer>
      <Octocat src={octocat} />
  </OctocatContainer>
)

const OctocatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Octocat = styled.img`
  width: 50px;
`

export default LoadingIndicator;