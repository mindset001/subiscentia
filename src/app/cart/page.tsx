import CartHero from '@/components/cart/CartHero'
import CartSelectionsAndBenefits from '@/components/cart/CartSelectionsAndBenefits'
import OrderSummary from '@/components/cart/OrderSummary'
import React from 'react'

function page() {
  return (
    <div>
        <CartHero/>
        <CartSelectionsAndBenefits/>
        <OrderSummary/>
    </div>
  )
}

export default page