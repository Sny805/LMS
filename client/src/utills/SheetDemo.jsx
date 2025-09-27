import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import DarkMode from "./DarkMode"

export function SheetDemo() {
    const role = "instructor"
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer"
                    variant="outline"
                >
                    <Menu />
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="flex flex-col">
                {/* Header */}
                <SheetHeader className="flex flex-row items-center justify-between mt-10">
                    <h1 className="text-lg font-semibold">My Learning</h1>
                    <DarkMode />
                </SheetHeader>

                {/* Navigation */}
                <nav className="flex flex-col ml-4">
                    <button className="text-left text-gray-700 hover:text-black font-semibold mb-2">Edit Profile</button>
                    <button className="text-left text-gray-700 hover:text-black font-semibold mb-2">My Learning</button>
                    <button className="text-left text-gray-700 hover:text-black font-semibold mb-2">Logout</button>
                </nav>

                {/* Dashboard button (moved right after nav) */}

                {
                    role === "instructor" && (<SheetClose asChild>
                        <Button className="mt-2 mx-4">Dashboard</Button>
                    </SheetClose>)
                }

            </SheetContent>

        </Sheet>
    )
}
