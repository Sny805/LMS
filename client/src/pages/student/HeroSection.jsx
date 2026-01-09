import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchQuery.trim() !== " ") {
            navigate(`/course/search?query=${searchQuery}`)
        }

    }

    return (
        <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-26 px-4 text-center">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-white text-4xl font-bold mb-4">
                    Find the best course for you
                </h1>
                <p className="text-gray-200 dark:text-gray-400 mb-6">
                    Discover, Learn, and Upskill with our wide range of courses
                </p>

                {/* Search Box */}
                <form onSubmit={handleSearchSubmit} className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
                    <input
                        type="text"
                        className="flex-grow border-none focus-visible:ring-0 px-6 py-3 dark:text-gray-100"
                        placeholder="Search courses"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type='submit' className="cursor-pointer  bg-blue-600 dark:bg-blue-800 text-white px-6 py-3 rounded-r-full hover:bg-blue-700">
                        Search
                    </button>
                </form>

                {/* Explore Button */}
                <Button onClick={() => navigate(`/course/search?query`)} className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200 cursor-pointer">
                    Explore Courses
                </Button>
            </div>
        </div>

    )
}

export default HeroSection