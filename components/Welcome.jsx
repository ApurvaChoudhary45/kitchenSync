import React from 'react'
import { signIn } from "next-auth/react"
import { animate, motion } from 'framer-motion'
const Welcome = () => {
    const contianer = (delay)=>({
      initial : {opacity: 0, y:-100},
      animate : {opacity : 1, y : 0,
        transition : {
          duration : 0.5,
          delay : delay
        }
      }
    })
    const contianer1 = (delay)=>({
      initial : {opacity: 0, y:100},
      animate : {opacity : 1, y : 0,
        transition : {
          duration : 0.5,
          delay : delay
        }
      }
    })
    return (
        <div className="relative w-full h-screen">
  <img
    src="https://images.pexels.com/photos/1482803/pexels-photo-1482803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    alt="No Image to display"
    className="w-full h-full object-cover blur-xs"
  />

  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-8 text-center px-8">
    <motion.h2 className="text-white text-6xl md:text-8xl font-bold font-serif flaming-text" variants={contianer(0.5)} initial='initial' animate='animate'>Kitchen Sync</motion.h2>
    
    <motion.p className="text-white text-lg md:text-2xl max-w-3xl font-mono" variants={contianer(0.8)} initial='initial' animate='animate'>
      From spicy street food to gourmet plates — we bring every flavor to your doorstep.
    </motion.p>

    <motion.button className="px-8 py-4 border-2 border-white text-white text-xl md:text-2xl font-semibold hover:bg-white hover:text-black transition font-mono rounded-4xl cursor-pointer flaming-button" variants={contianer1(1.3)} initial='initial' animate='animate' onClick={() => signIn()}>
      Explore Now
    </motion.button>
  </div>
</div>

    )
}

export default Welcome
