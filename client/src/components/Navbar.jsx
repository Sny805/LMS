import { School } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,

    DropdownMenuSeparator,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import DarkMode from '@/utills/DarkMode'
import { SheetDemo } from '@/utills/SheetDemo'
import { Link } from 'react-router-dom'

const Navbar = () => {
    let user = true;
    return (
        <div className='h-16 dark:bg-[#0A0AOA] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 right-0 left-0 duration-300 z-10'>
            {/* Desktop */}
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
                <div className='flex gap-10'>
                    <School size={30} />
                    <h1 className='hidden md:block font-extrabold text-2xl '>E-Learning</h1>
                </div>
                {/* User Icons and darkmode icons */}

                <div className='flex gap-4'>
                    {
                        user ? (<DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-52 mr-4" align="start">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link to="/profile"> Edit  Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="my-learning">
                                            My Learning
                                        </Link>

                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Log out

                                    </DropdownMenuItem>


                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />



                                <DropdownMenuItem>
                                    Dashboard

                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>) : (
                            <div className='flex gap-2 items-center'>
                                <Button variant="outline">Login</Button>
                                <Button>Signup</Button>
                            </div>
                        )
                    }
                    <DarkMode />
                </div>


            </div>

            <div className='flex justify-between items-center px-4 md:hidden h-full'>
                <h1 className='text-2xl font-extrabold'>E-Learning</h1>
                <SheetDemo />
            </div>


        </div>
    )
}

export default Navbar