import Image from 'next/image'
import React from 'react'
import Perf from '../../../../../../public/images/perf.png'

function Hero() {
  return (
    <Image src={Perf} alt="Hero" className="object-cover" />
  )
}

export default Hero