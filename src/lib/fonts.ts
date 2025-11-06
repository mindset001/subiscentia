import localFont from 'next/font/local'

export const sackersGothic = localFont({
  src: [
    {
      path: '../../public/fonts/SackersGothicStd-Heavy.otf',
      weight: '800',
      style: 'normal',
    }
  ],
  variable: '--font-sackers-gothic'
})

export const sephir = localFont({
  src: [
    {
      path: '../../public/fonts/sephir/Sephir-Regular.otf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-sephir'
})

export const circularStd = localFont({
  src: [
    {
      path: '../../public/fonts/CircularStd-Book.ttf',
      weight: '400',
      style: 'normal',
    },
   
  ],
  variable: '--font-circular'
})