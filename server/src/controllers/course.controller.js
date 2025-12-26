import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { ApiError } from "../utills/ApiError.js";
import { ApiResponse } from "../utills/ApiResponse.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utills/cloudinary.js";



export const createCourse = asyncHandler(async (req, res) => {
    const { courseTitle, category } = req.body;

    if (!courseTitle || !category) {
        throw new ApiError(400, "Course title and Category is required")
    }

    const course = await Course.create({
        courseTitle,
        category,
        creator: req.id
    })

    return res.status(201).json(new ApiResponse(201, course, "Course Created SuccessFully"))
})


export const getCreatorCourses = asyncHandler(async (req, res) => {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
        throw new ApiError(404, "Course Not Found")
    }
    return res.status(200).json({ courses })
})


export const editCourse = asyncHandler(async (req, res) => {
    const courseId = req.params.courseId;
    const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
    const thumbnail = req.file;
    let course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(404, "Course Not Found");
    }
    let courseThumbnail;
    if (thumbnail) {
        if (course.courseThumbnail) {
            const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
            await deleteMediaFromCloudinary(publicId)
        }
        courseThumbnail = await uploadMedia(thumbnail.path)
    }
    const updateData = { courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url };

    course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

    return res.status(200).json(new ApiResponse(200, course, "Course Updated Successfully"))

})

export const getCourseById = asyncHandler(async (req, res) => {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found")
    }
    return res.status(200).json({ course });


})

///// Lecture Controller 

export const createLecture = asyncHandler(async (req, res) => {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
        throw new ApiError(400, "Lecture title and course id is required")
    }
    // create lecture
    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);

    if (course) {
        course.lectures.push(lecture._id);
        await course.save()
    }

    return res.status(201).json({
        lecture,
        message: "Lecture created successfully"
    })
})


export const getCourseLecture = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
        throw new ApiError(400, "No course found")
    }

    const lectures = course.lectures;

    return res.status(200).json({ lectures })

})