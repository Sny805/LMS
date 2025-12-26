import { Button } from '@/components/ui/button'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi'
import TableDemo from '@/utills/Table'
import React from 'react'
import { Link } from 'react-router-dom'

const CourseTable = () => {
    const { data, isLoading, error } = useGetCreatorCourseQuery();


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading courses</p>;
    return (
        <div>
            <Link to="create"><Button className="cursor-pointer">Create a new course</Button></Link>
            <div className='mt-4'>
                <TableDemo courses={data?.courses} />
            </div>

        </div>
    )
}

export default CourseTable