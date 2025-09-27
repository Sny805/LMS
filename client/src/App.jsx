import { Button } from './components/ui/button'


import './App.css'
import { Login } from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import { MainLayout } from './Layout/MainLayout'
import Courses from './pages/student/Courses'
import { MyLearning } from './pages/student/MyLearning'
import { Profile } from './pages/student/Profile'

function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element:
            <>
              <HeroSection />
              <Courses />
            </>
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "my-learning",
          element: <MyLearning />
        },
        {
          path: "profile",
          element: <Profile />
        }
      ]
    }
  ])


  return (
    <>
      <main>
        <RouterProvider router={appRouter} />
      </main>

    </>
  )
}

export default App
