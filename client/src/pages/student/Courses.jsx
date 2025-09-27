import React from 'react'
import { SkeletonCard } from '@/utills/Skeleton'
import { Course } from './Course'

const Courses = () => {
    const isLoading = false
    const courses = [1, 2, 3, 45, 6, 4]
    return (
        <div className='bg-gray-50'>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className='font-bold text-3xl text-center mb-10'>Our Courses</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {
                        isLoading ? Array.from({ length: 8 }).map((__, i) => (< SkeletonCard key={i} />)) : courses.map((_, i) => (<Course key={i} />))
                    }
                </div>

            </div>
        </div>
    )
}

export default Courses