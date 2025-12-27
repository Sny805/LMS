import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createCourse, createLecture, editCourse, getCourseById, getCourseLecture, getCreatorCourses } from "../controllers/course.controller.js";
import upload from "../utills/multer.js";


const courseRouter = Router();
courseRouter.route("/").post(isAuthenticated, createCourse);
courseRouter.route("/").get(isAuthenticated, getCreatorCourses);
courseRouter.route("/:courseId/lecture").post(isAuthenticated, createLecture);
courseRouter.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
courseRouter.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
courseRouter.route("/:courseId").get(isAuthenticated, getCourseById);


export default courseRouter;