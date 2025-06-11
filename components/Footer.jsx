import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-700 text-gray-200 py-10 px-6 ">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-orange-400">Kitchen Sync</h2>
                        <p className="text-sm mt-2">Bringing every flavor to your doorstep.</p>
                    </div>

                    <div className="flex gap-6 text-sm">
                        <a href="#" className="hover:text-orange-400 transition">Home</a>
                        <a href="#" className="hover:text-orange-400 transition">Menu</a>
                        <a href="#" className="hover:text-orange-400 transition">Cart</a>
                        <a href="#" className="hover:text-orange-400 transition">Contact</a>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 mt-8">
                    &copy; {new Date().getFullYear()} Kitchen Sync. All rights reserved.
                </div>
            </footer>

        </div>
    )
}

export default Footer
