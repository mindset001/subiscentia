import CartHero from '@/components/cart/CartHero'
import CartSelectionsAndBenefits from '@/components/cart/CartSelectionsAndBenefits'
import OrderSummary from '@/components/cart/OrderSummary'
import Footer from '@/components/Footer'
import { JoinScentJourney } from '@/components/landing'
import Navbar from '@/components/Navbar'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar/>
        <CartHero/>
        <CartSelectionsAndBenefits/>
        <OrderSummary/>
        <JoinScentJourney/>
        <Footer/>
    </div>
  )
}

export default page