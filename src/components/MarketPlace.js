import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import LoadingIndicator from './LoadingIndicator'

const MarketPlace = ({ data }) => {

  let slicedListings;

  const listings = data.marketplaceListings ? data.marketplaceListings.nodes.map(listing => {
    return (
      <MarketPlaceItemContainer key={listing.name}>
          <MarketPlaceImage src={listing.logoUrl} />
          <MarketPlaceItemInfo>
            <a href={listing.companyUrl}>
              <Name>{listing.name}</Name>
            </a>
            <ShortDescription>{listing.shortDescription}</ShortDescription>
          </MarketPlaceItemInfo>
      </MarketPlaceItemContainer>
    )
  }) : <LoadingIndicator />


  if(data.marketplaceListings) {
    slicedListings = data.marketplaceListings.nodes.slice(0, 4);
    slicedListings = slicedListings.map(l => {
      return (
        <LargeItemBox key={l.name } color={`#${l.logoBackgroundColor}`}>
          <ItemLink href={ l.companyUrl} >
            <LargeItemImage src={ l.logoUrl } />
            <p>{ l.name }</p> 
          </ItemLink>
        </LargeItemBox>
      )
    })
  }

  return (
    <div>
      <MarketPlaceJumbotron>
        <Title>Github MarketPlace</Title>
        <SubTitle>Tools to build on and improve your workflow</SubTitle>
        <LargeItemContainer>
          {slicedListings}
        </LargeItemContainer>
      </MarketPlaceJumbotron>
      <MarketPlaceContainer>
        <ListingContainer>
          {listings}
        </ListingContainer>
      </MarketPlaceContainer>
    </div>
  )
}

const MarketPlaceContainer = styled.div`
  width: 980px;
  margin: 0 auto;
`

const ListingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const LargeItemBox = styled.div`
  height: 240px;
  width: 300px;
  background: ${props => props.color };
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`

const LargeItemImage = styled.img`
  height: 75px;
  width: 75px;
  border-radius: 50%;
  margin-bottom: 10px;
  position: relative;
  top: 0;
  transition: top 0.15s ease-in, box-shadow 0.12s ease-in;
  &:hover {
    top: -10px;
  }
`
const ItemLink = styled.a`
  color: #24292e;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`

const MarketPlaceItemContainer = styled.div`
  display: flex;
  width: 300px;
  margin-bottom: 10px;
`

const MarketPlaceItemInfo = styled.div`
  margin-left: 10px;
`

const LargeItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`

const MarketPlaceJumbotron = styled.div`
  background-color: #2f363d;
  background-image: url(https://www.github.com/images/modules/marketplace/bg-hero.svg);
  background-position: center top;
  background-size: cover;
  padding-top: 40px !important;
  padding-bottom: 40px !important;
  margin-top: -24px;
  margin-bottom: 20px;
`

const Title = styled.h2`
  font-size: 54px;
  font-weight: 300;
  text-align: center;
  color: #fff;
  margin-bottom: 16px;
`

const SubTitle = styled.h2`
  font-size: 26px;
  font-weight: 300;
  text-align: center;
  color: #fff;
  opacity: 0.5;
`

const ShortDescription = styled.p`
  color: #6a737d;
  font-size: 14px;
`

const Name = styled.p`
  color: #0366d6;
`

const MarketPlaceImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

export default graphql(gql`
  query {
    marketplaceListings(first: 10) {
      nodes {
        companyUrl
        logoUrl
        logoBackgroundColor
        name
        pricingUrl
        shortDescription
      }
    }
  }
`)(MarketPlace)


