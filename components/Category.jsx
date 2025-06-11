import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { categories } from '@/Redux/Featured/featured';

const Category = () => {
    const categoriesList = ['Chicken', 'Beef', 'Seafood', 'Lamb', 'Vegan', 'Vegetarian'];
    const [activeTab, setactiveTab] = useState('Chicken');
    const dispatch = useDispatch();

    const container = (delay) => ({
        initial: { opacity: 0, y: 100 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: delay
            }
        }
    });

    return (
        <div className="relative w-full py-5">
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-20 gap-8 text-center z-50 ">
                <motion.h1
                    className="text-2xl md:text-4xl font-mono text-white glitter"
                    variants={container(0.9)}
                    initial="initial"
                    animate="animate"
                >
                    Top Dishes
                </motion.h1>

                <motion.div
                    className="flex flex-wrap justify-center gap-3 bg-black/50 rounded-full px-6 py-3"
                    variants={container(1.3)}
                    initial="initial"
                    animate="animate"
                >
                    {categoriesList.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setactiveTab(tab);
                                dispatch(categories(tab));
                            }}
                            className="relative px-4 py-1 font-semibold rounded-full text-green-400 hover:text-yellow-300 cursor-pointer"
                        >
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white/30 rounded-full z-0"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{tab}</span>
                        </button>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Category;
