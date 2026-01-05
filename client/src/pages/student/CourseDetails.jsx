import ByCourseButton from '@/components/ByCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetCourseByIdQuery } from '@/features/api/courseApi'
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi'
import ReactPlayer from "react-player";
import { BadgeInfo, LockIcon, PlayCircle } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CourseDetails = () => {
  const { courseId } = useParams()
  const navigate=useNavigate();
  const { data, isLoading, isError, error } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h>Failed to load course details</h>;

  const { course, purchased } = data;
  const { courseTitle, creator, subTitle, description, createdAt,
    enrolledStudents, lectures, coursePrice } = course
  const handleContinueCourse = () => {
      if(purchased){
        navigate(`/course-progress/${courseId}`)
      }

  }



  return (
    <div className='mt-20'>
      <div className='bg-[#2D2F31] text-white'>
        <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
          <h1 className='font-bold text-2xl md:text-3xl'>{courseTitle}</h1>
          <p className='text-base md:text-lg'>{subTitle}</p>
          <p>Created By {" "} <span className="text-[#C0C4FC] underline italic">{creator?.fullName}</span></p>
          <div className='flex items-center gap-2 text-sm'>
            <BadgeInfo size={16} />
            <p>Last Updated : {createdAt.split("T")[0]}</p>
          </div>
          <p>Student Enrolled :{enrolledStudents.length}</p>
        </div>
      </div>
      <div className='max-w-7xl mx-auto my-5 p-4 md:px-8 flex flex-col lg:flex-row justify-between gap-1'>
        <div className='w-full lg:w-1/2 space-y-5'>
          <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <Card>
            <CardHeader>
              <CardTitle>
                Course Content
              </CardTitle>
              <CardDescription>4 lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {
                lectures.map((lecture, i) => (
                  <div key={i} className='flex items-center gap-2 text-sm'>
                    <span>{purchased ? (<PlayCircle size={14} />) : (<LockIcon size={14} />)}</span>
                    <p>{lecture.lectureTitle}</p>
                  </div>
                ))
              }

            </CardContent>
          </Card>
        </div>

        <div className='w-full lg:w-1/3'>
          <Card>
            <CardContent className='p-4 flex flex-col'>
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  url={lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h1>Lecture Title</h1>
              <Separator className="my-2" />
              <h1 className='text-lg md:text-xl font-semibold'>{coursePrice}</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? <Button className="w-full" onClick={handleContinueCourse}>Continue Course</Button> : (<ByCourseButton courseId={courseId} />)}
            </CardFooter>
          </Card>
        </div>
      </div>

    </div>
  )
}

export default CourseDetails