import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "/api/v1/course"

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ['Refetch_Creator_Course', 'Refetch_Lecture'],
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: "",
                method: "POST",
                body: { courseTitle, category },
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),
        getCreatorCourse: builder.query({
            query: () => ({
                url: "",
                method: "GET",
            }),
            providesTags: ['Refetch_Creator_Course']
        }),
         getPublishedCourse: builder.query({
            query: () => ({
                url: "/published-course",
                method: "GET",
            }),
            providesTags: ['Refetch_Creator_Course']
        }),
        editCourse: builder.mutation({
            query: ({ formData, courseId }) => ({
                url: `/${courseId}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),

        getCourseById: builder.query({
            query: (courseId) => (
                {
                    url: `/${courseId}`,
                    method: "GET"
                }

            )
        }),

        ////  Lecture  Api calls
        createLecture: builder.mutation({
            query: ({ lectureTitle, courseId }) => ({
                url: `/${courseId}/lecture`,
                method: "POST",
                body: { lectureTitle }

            }),

        }),

        getCourseLecture: builder.query({
            query: (courseId) => (
                {
                    url: `/${courseId}/lecture`,
                    method: "GET"
                }
            ),
            providesTags: ["Refetch_Lecture"]
        }),
        editLecture: builder.mutation({
            query: ({ courseId, lectureId, lectureTitle, videoInfo, isPreviewFree }) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: "POST",
                body: { lectureTitle, videoInfo, isPreviewFree }
            })
        }),
        deleteLecture: builder.mutation({
            query: (lectureId) => (
                {
                    url: `/lecture/${lectureId}`,
                    method: "DELETE"
                }
            ),
            invalidatesTags: ["Refetch_Lecture"]
        }),
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: "GET"
            })
        }),

        publishCourse: builder.mutation({
            query: ({ courseId, publish }) => ({
                url: `/${courseId}`,
                method: "PATCH",
                params: { publish }
            }),
            invalidatesTags: ["Refetch_Creator_Course"]
        })


    })

})

export const {
    useCreateCourseMutation,
    useGetCreatorCourseQuery,
    useEditCourseMutation,
    useGetCourseByIdQuery,
    useCreateLectureMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useDeleteLectureMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation,
    useGetPublishedCourseQuery
} = courseApi