import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'sonner'


const MEDIA_API = "/api/v1/media"

const LectureTab = () => {
    const [lectureTitle, setLectureTitle] = useState("");
    const [uploadVideInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [btnDisable, setBtnDisable] = useState(true);

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                setMediaProgress(true);
                const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
                     
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round(loaded * 100 / total))
                    }
                })
                if (res.data.success) {
                    setUploadVideoInfo({
                        videoUrl: res.data.data.url,
                        publicId: res.data.data.public_id,
                    });
                    setBtnDisable(false)
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.log(error)
                toast.error("video upload failed")
            }
            finally {
                setMediaProgress(false);
            }
        }



    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription className="mt-2">
                        Make changes and click save when done.
                    </CardDescription>
                </div>
                <div>
                    <Button variant="destructive" className="mt-3">Remove Lecture</Button>
                </div>
            </CardHeader>

            <CardContent>
                <div>
                    <label htmlFor="">Title</label>
                    <Input
                        type="text"
                        placeholder="Ex. Introduction to Javascript"
                        className="mt-2"
                    />
                </div>
                <div className='mt-2'>
                    Video <span className="text-red-500">*</span>
                    <Input
                        type="file"
                        accept="video/*"
                        className="w-fit mt-2"
                        onChange={fileChangeHandler}
                    />
                </div>
                <div className="flex items-center space-x-2 my-5">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Is this video FREE</Label>
                </div>
                {
                    mediaProgress && (
                        <div className="mt-2">
                            <Progress value={uploadProgress} />
                            <p>{uploadProgress} % uploaded</p>
                        </div>
                    )
                }
                <div>
                    <Button>
                        Update Lecture
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab