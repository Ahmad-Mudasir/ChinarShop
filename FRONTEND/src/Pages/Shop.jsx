//main page
import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'


const Shop = () => {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <Hero />
      <Popular/>
      <Offers />
      <NewCollections />
      <NewsLetter />
      
    </div>
  )
}

export default Shop