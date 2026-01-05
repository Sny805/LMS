import React from 'react'
import { Course } from './Course'
import { SkeletonCard } from '@/utills/Skeleton'

export const MyLearning = () => {
    const isLoading = false
    const courses = [1, 2, 3, 45, 6, 4]
    return (
        <div className='max-w-6xl mx-auto my-24 px-4 md:px-0'>
            <h1 className="font-bold text-2xl mb-4">My Learning</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {
                    isLoading ? 
                    Array.from({ length: 8 }).map((__, i) => (<SkeletonCard key={i} />)) :
                     courses.length == 0 ? (<p> You are not enrolled in any courses</p>) : 
                     courses.map((course, i) => (<Course key={i} course={course}/>))
                }
            </div>
        </div>
    )
}
