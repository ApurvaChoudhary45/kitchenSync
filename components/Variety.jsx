import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dishes } from '@/Redux/Dish/dish'
import Spinner from './Spinner'
import Link from 'next/link'
import { motion } from 'framer-motion'
const Variety = () => {
    const dish = useSelector(state => state.menu.dish)
    const menu = useSelector(state => state.categoryy.feature)
    const look = useSelector(state=> state.searching.query)
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetcher = async () => {
            setloading(true)
            const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${menu}`)
            const response = await data.json()
            dispatch(dishes(response.meals))
            setloading(false)
        }
        fetcher()
    }, [menu, dispatch])
    useEffect(() => {
        const fetched = async () => {
            setloading(true)
            const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${look}`)
            const response = await data.json()
            dispatch(dishes(response.meals))
            setloading(false)
        }
        fetched()
    }, [look, dispatch])
    
        const storeToCart = async(item)=>{
            let details = {
                id: item.idMeal,
                name: item.strMeal,
                category : item.strCategory,
            img: item.strMealThumb
            }
            const storing = await fetch('/api/storecart', {method : "POST",
                headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
            })
            storing()
        }
        
    return (
        <>
            <div className='md:grid md:grid-cols-3 md:gap-8 relative z-10 px-15 grid grid-cols-1 py-10'>
                {loading ? (<Spinner />) : (Array.isArray(dish) && dish.length > 0 ? dish.map(item => {
                    return (<motion.div className="bg-white shadow-md rounded-2xl overflow-hidden w-full max-w-md mt-10" whileInView={{opacity:1, y:0}} initial={{opacity:0, y:100}} transition={{duration: 0.5}} key={item.idMeal}>
                        <img
                            src={item.strMealThumb}
                            alt="Dish"
                            className="w-full h-60 object-cover"
                        />

                        <div className="p-5 flex flex-col gap-3">
                            <h2 className="text-2xl font-semibold text-gray-800">{item.strMeal}</h2>
                            <p className="text-gray-600 text-sm">{item.strCategory}</p>
                            <p className="text-gray-600 text-sm">{item.strArea}</p>
                            <div className="text-xl font-bold text-orange-500">₹199</div>

                            <div className="flex gap-4 mt-4">
                                <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer" onClick={()=>storeToCart(item)}>
                                    Add to Cart
                                </button>
                                <Link href={`/Order/${item.idMeal}`}><button className="flex-1 px-5 border-2 border-orange-500 text-orange-500 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition cursor-pointer">
                                    Order Now
                                </button></Link>
                            </div>
                        </div>
                    </motion.div>)
                }): (
                <div className="col-span-3 flex justify-center items-center py-20 w-full">
                <p className='text-center text-4xl text-orange-400 font-semibold py-20 w-full'>No dishes to display</p>
                </div>))}

            </div>
        </>
    )
}

export default Variety
