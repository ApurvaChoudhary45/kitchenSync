'use client'
import { useState, useEffect } from 'react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import { Menu, X } from 'lucide-react';
const page = () => {
    const pathname = usePathname();
    const tabs = ['Home', 'Menu', 'History', 'Cart']
    const [carting, setcarting] = useState([])
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter()
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
    const scroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    useEffect(() => {
        const getCart = async () => {
            const getData = await fetch('/api/cart')
            const resultant = await getData.json()
            setcarting(resultant.result)
        }
        getCart()
    }, [])
    const placing = async (dish) => {
        let details = {
            id: dish.id,
            name: dish.name,
            category: dish.category,
            img: dish.img

        }
        const data = await fetch('/api/place', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        })
        const deletion = await fetch(`/api/deletion/${dish.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: dish._id })

        })
        if (deletion.ok) {
            const data = await deletion.json();
            console.log("Deleted:", data);
        } else {
            console.error("Deletion failed:", deletion.status);
        }


        router.push('/Placed')
    }
    return (
        <div className="min-h-screen flex flex-col">
            <div className="relative w-full flex-grow">
                <img
                    src="https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="No image to display"
                    className="w-full h-full object-cover blur-xs absolute inset-0"
                />
                <div className="relative z-10">
                    <motion.div className="fixed top-0 left-0 right-0 z-50 flex justify-around mx-5 py-4 bg-black/40 backdrop-blur-sm shadow-lg rounded-b-lg" variants={contianer(0.1)} initial='initial' animate='animate'>
                        <div className='md:hidden'>
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                        <h1 className="text-3xl font-semibold text-white font-mono">Kitchen Sync</h1>
                        <div className="hidden md:flex items-center space-x-6">
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
                        <button
                            className="text-white border px-4 py-2 cursor-pointer hover:bg-green-300 hover:text-black transition rounded-4xl"
                            onClick={() => signOut({ callbackUrl: '/' })}
                        >
                            Log out
                        </button>
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
                    <div className="grid grid-cols-1 gap-5 py-10 px-5">
                        {Array.isArray(carting) && carting.length > 0 && carting.map(item => (
                            <motion.div className="bg-white shadow-lg rounded-xl overflow-hidden w-full md:w-[60%] mx-auto my-5" key={item._id} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 100 }} transition={{ duration: 0.5 }}>
                                <img
                                    src={item.img}
                                    alt="Dish"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5 flex flex-col gap-2">
                                    <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                                    <p className="text-sm text-gray-600">Category: {item.category}</p>
                                    <button
                                        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition text-center"
                                        onClick={() => placing(item)}
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
            <button onClick={scroll} className="fixed bottom-6 right-3 z-50 bg-white border border-gray-300 shadow-lg rounded-full p-3 hover:bg-gray-100 transition">↑</button>
        </div>


    )
}

export default page
