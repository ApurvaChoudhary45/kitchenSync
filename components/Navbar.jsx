import React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react"
import { Menu, X } from 'lucide-react';
const Navbar = () => {
    const pathname = usePathname();
    const tabs = ['Home', 'Menu', 'History', 'Cart']
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            <motion.div className='relative w-full h-screen' variants={contianer(0.5)} initial='initial' animate='animate'>
                <img src="https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="No image to display" className="w-full h-full object-cover blur-xs" />
                <div className=' top-0 left-0 right-0 z-50 flex justify-around mx-5 py-4 bg-black/40 backdrop-blur-sm shadow-lg rounded-b-lg fixed'>
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
                    <button className='text-white border px-4 py-2 cursor-pointer  hover:bg-green-300 hover:text-black transition rounded-4xl relative z-20' onClick={() => signOut({ callbackUrl: '/' })}>Log out</button>
                </div>
            </motion.div>
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-16 left-4 right-4 bg-black/70 text-white rounded-lg p-4 z-40 md:hidden"
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
        </>
    )
}

export default Navbar
