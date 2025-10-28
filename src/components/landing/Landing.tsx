import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Hero from './Hero'
import FragranceCollections from './FragranceCollections'
import LuminousFlorals from './LuminousFlorals'
import MostBelovedFragrances from './MostBelovedFragrances'
import JoinScentJourney from './JoinScentJourney'

function Landing() {
  return (
    <div>
        <Navbar/>
        {/* Hero Section */}
      <Hero />

      {/* Fragrance Collections Section */}
      <FragranceCollections />
        {/* Luminous Florals Section */}
      <LuminousFlorals />

      {/* Most Beloved Fragrances Section */}
      <MostBelovedFragrances />
      <JoinScentJourney/>
        <Footer/>
    </div>
  )
}

export default Landing