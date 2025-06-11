import React from 'react'
import { useSession } from "next-auth/react"
import { motion } from 'framer-motion'

const MenuItemCard = () => {
  const { data: session } = useSession()

  const container = (delay) => ({
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
      },
    },
  })

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 gap-6">
      {session?.user?.name && (
        <motion.h1
          className="font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight"
          variants={container(0.5)}
          initial="initial"
          animate="animate"
        >
          Welcome, {session.user.name}
        </motion.h1>
      )}

      <motion.p
        className="text-xl sm:text-2xl md:text-3xl text-green-300 font-semibold"
        variants={container(0.7)}
        initial="initial"
        animate="animate"
      >
        What is on your plate today?
      </motion.p>

      <motion.p
        className="max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white"
        variants={container(1)}
        initial="initial"
        animate="animate"
      >
        Handpicked ingredients, lovingly prepared, and plated with purpose. We don't just feed you — we bring comfort and delight to your day. Craving something extraordinary? Let your tastebuds decide.
      </motion.p>

      <motion.h3
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white glitter"
        variants={container(1.3)}
        initial="initial"
        animate="animate"
      >
        Order Now
      </motion.h3>
    </div>
  )
}

export default MenuItemCard
