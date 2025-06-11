'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


export default function DishDetail({ params }) {
    const [dish, setDish] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchDish = async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`)
                const data = await res.json()
                setDish(data.meals?.[0] || null)
            } catch (error) {
                console.error('Failed to fetch dish:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchDish()
    }, [params.id])
    const placing = async () => {
        let details = {
            name : dish.strMeal,
            category : dish.strCategory,
            img: dish.strMealThumb

        }
        const data = await fetch('/api/place', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        })
        router.push('/Placed')
    }

    if (loading) return <p className="text-center py-10">Loading dish...</p>
    if (!dish) return <p className="text-center py-10">Dish not found</p>

    return (
        <div className="flex justify-center items-center flex-col mt-30 gap-5 bg-gray-300/20 rounded-4xl py-10">
            <h1 className="text-6xl text-orange-400 text-center px-6">Confirm your order by clicking Place Order</h1>
            <h2 className="text-3xl font-bold mb-2">{dish.strMeal}</h2>
            <p className="text-gray-600 mb-4 text-2xl">{dish.strCategory} | {dish.strArea}</p>
            <img src={dish.strMealThumb} alt={dish.strMeal} className="rounded-xl mb-6 h-40" />

            <div className="flex gap-4 mt-6">
                <button
                    className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => router.push('/Menu')}
                >
                    Back
                </button>

                <button
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 cursor-pointer"
                    onClick={placing}
                >
                    Place Order
                </button>
            </div>
        </div>
    )
}
