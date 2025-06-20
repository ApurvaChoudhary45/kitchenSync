'use client'
import Navbar from '@/components/Navbar'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import Category from '@/components/Category'
import Variety from '@/components/Variety'
import { useSelector, useDispatch } from 'react-redux'
import { searched } from '@/Redux/Search/search'
import { useState } from 'react'
import Footer from '@/components/Footer'
import { Menu, X } from 'lucide-react';
const Page = () => {
    const dispatch = useDispatch()
    const [seached, setseached] = useState('')
    const pathname = usePathname();
    const tabs = ['Home', 'Menu', 'History', 'Cart']
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearch = (func, delay)=>{
        let timeoutId;
        return function(...args){
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                func.apply(this, args)
            }, delay);
        }
    }

    const searchInput = (value)=>{
        console.log('Searching for:' , value)
    }
    const searchHandler = handleSearch(searchInput, 500)


    const searchfood = () => {
        dispatch(searched(seached))
    }

    const scroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const contianer = (delay) => ({
        initial: { opacity: 0, y: -100 },
        animate: {
            opacity: 1, y: 0,
            transition: {
                duration: 0.5,
                delay: delay
            }
        }
    })

    return (
        <>
            <div className='relative w-full h-screen '>
                <img 
                    src="https://images.pexels.com/photos/12935080/pexels-photo-12935080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="No image to display" 
                    className='absolute inset-0 w-full h-full object-cover z-0 blur-xs' 
                />

                <motion.div className='absolute top-0 left-0 right-0 z-50 flex justify-around mx-5 py-4 bg-black/40 backdrop-blur-sm shadow-lg rounded-b-lg' variants={contianer(0.5)} initial='initial' animate='animate'>
                <div className='md:hidden'>
    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
      {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  </div>
                    <h1 className='text-3xl font-semibold text-white font-mono relative z-20'>Kitchen Sync</h1>
                    <div className='hidden md:flex items-center space-x-6'>
                        <div className="flex bg-transparent rounded-full px-4 py-2 space-x-6">
                            {tabs.map((item) => {
                                const path = `/${item}`;
                                const active = pathname === path;
                                return (
                                    <Link href={path} key={item} className="relative">
                                        <button className="relative px-4 py-1 font-semibold rounded-full text-green-400 hover:text-yellow-300 cursor-pointer">
                                            {active && (
                                                <motion.div
                                                    layoutId="active"
                                                    className="absolute inset-0 bg-white/30 rounded-full z-0"
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                            <span className="relative z-10">{item}</span>
                                        </button>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    
                    <button className='text-white border px-4 py-2 cursor-pointer hover:bg-green-300 hover:text-black transition rounded-4xl relative z-20'>Log out</button>
                </motion.div>
                <AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-16 left-4 right-4 bg-black/80 text-white rounded-lg p-4 z-40 md:hidden"
    >
      <div className="flex flex-col space-y-4">
        {tabs.map(tab => {
          const path = `/${tab}`;
          return (
            <Link key={tab} href={path} onClick={() => setMobileMenuOpen(false)}>
              <span className="block px-4 py-2 rounded hover:bg-white/10">{tab}</span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  )}
</AnimatePresence>

                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-10 w-full max-w-4xl px-4 z-50 text-center'>
                    <motion.h1 className='md:text-4xl text-white font-mono text-2xl leading-relaxed' variants={contianer(0.8)} initial='initial' animate='animate'>
                        Craving something delicious? Explore dishes that hit the spot every single time. Search now and treat yourself — your next favorite meal is just a click away. 🍽️
                    </motion.h1>
                    <motion.div className="relative z-50 flex flex-col sm:flex-row items-center bg-white rounded-full shadow-md overflow-hidden px-4 py-2 w-full" variants={contianer(1)} initial='initial' animate='animate'>
                        <input
                            type="text"
                            placeholder="Search for delicious dishes..."
                            className="flex-grow outline-none text-gray-700 placeholder-green-500 bg-transparent relative"
                            value={seached}
                            onChange={(e) => {setseached(e.target.value);
                                searchHandler(e.target.value)
                            }}
                        />
                        <button className="mt-2 sm:mt-0 sm:ml-3 bg-black text-white px-4 py-2 rounded-full cursor-pointer hover:text-green-300 transition relative" onClick={searchfood}>
                            Search
                        </button>
                    </motion.div>
                </div>
                
            </div>

            <Category />
            <Variety />
            <Footer />

            <button onClick={scroll} className="fixed bottom-6 right-3 z-50 bg-white border border-gray-300 shadow-lg rounded-full p-3 hover:bg-gray-100 transition">↑</button>
        </>
    )
}

export default Page
