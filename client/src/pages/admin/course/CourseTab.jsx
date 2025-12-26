import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/utills/RichTextEditor';
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useEditCourseMutation, useGetCourseByIdQuery } from '@/features/api/courseApi';
import { toast } from 'sonner';

const CourseTab = () => {
    const navigate = useNavigate()
    const { courseId } = useParams();
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
    });
    const [previewThumbnail, setPreviewThumbnail] = useState("");

    // Select Input fields
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    // Select Category
    const selectCategory = (value) => {
        setInput({ ...input, category: value })
    }
    // Select Course Level
    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value })
    }
    // Select file
    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file)
        }
    }

    const [editCourse, { data, isLoading, error, isSuccess }] = useEditCourseMutation();
    const { data: courseData, isLoading: isCourseLoading } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true })

    // update course
    const updateCourseHandler = async () => {
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("subTitle", input.subTitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("courseThumbnail", input.courseThumbnail);
        await editCourse({ formData, courseId });
    }



    useEffect(() => {
        if (courseData?.course) {
            const course = courseData?.course
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: "",
            })
        }
    }, [courseData])

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course update.");
            navigate("/admin/course");
        }
        if (error) {
            toast.error(error.data.message || "Failed to update course");
        }
    }, [isSuccess, error]);

    if (isCourseLoading) {
        return <h1>Loading...</h1>
    }



    const isPublished = true;
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>
                        Make changes to your courses here. Click save when you're done.
                    </CardDescription>
                </div>
                <div className='space-x-2'>
                    <Button variant="outline">
                        {isPublished ? "Unpublished" : "Published"}
                    </Button>
                    <Button>Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-2">
                    <div className='space-y-2'>
                        <Label> Title</Label>
                        <Input
                            type="text"
                            name="courseTitle"
                            value={input.courseTitle}

                            placeholder="Ex. Fullstack developer"
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>Subtitle</Label>
                        <Input
                            type="text"
                            name="subTitle"
                            value={input.subTitle}
                            onChange={changeEventHandler}
                            placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"

                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>Description</Label>
                        <RichTextEditor input={input} setInput={setInput} />
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='space-y-2'>
                            <Label>Category</Label>
                            <Select
                                defaultValue={input.category}
                                onValueChange={selectCategory}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next JS">Next JS</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="Frontend Development">
                                            Frontend Development
                                        </SelectItem>
                                        <SelectItem value="Fullstack Development">
                                            Fullstack Development
                                        </SelectItem>
                                        <SelectItem value="MERN Stack Development">
                                            MERN Stack Development
                                        </SelectItem>
                                        <SelectItem value="Javascript">Javascript</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Docker">Docker</SelectItem>
                                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                                        <SelectItem value="HTML">HTML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='space-y-2'>
                            <Label>Course Level</Label>
                            <Select
                                defaultValue={input.courseLevel}
                                onValueChange={selectCourseLevel}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a course level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='space-y-2'>
                            <Label>Price in (INR)</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                onChange={changeEventHandler}
                                placeholder="199"
                                className="w-fit"
                            />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label>Course Thumbnail</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            className="w-fit"
                            onChange={selectThumbnail}
                        />
                        {previewThumbnail && (
                            <img
                                src={previewThumbnail}
                                className="e-64 my-2"
                                alt="Course Thumbnail"
                            />
                        )}
                    </div>
                    <div className='space-x-2'>
                        <Button onClick={() => navigate("/admin/course")} variant="outline" className="cursor-pointer">
                            Cancel
                        </Button>
                        <Button disabled={isLoading} className="cursor-pointer" onClick={updateCourseHandler}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseTab