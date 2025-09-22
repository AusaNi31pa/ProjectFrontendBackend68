import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const RootLayout = () => {
  return (
    <div className="bg-gradient-to-br from-[#0A22FA] via-black to-[#560081] min-h-screen">
        <Navbar />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default RootLayout