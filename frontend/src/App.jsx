import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register.jsx'
import CourseDetail from './pages/CourseDetailPage.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import LearningPage from './pages/LearningPage.jsx'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<h1 className="text-center mt-5">Courses Page</h1>} />
        <Route path="/courses/:id" element={<CourseDetail/>} />
        <Route element={<PrivateRoute/>} > 
          <Route path="/learning" element={<LearningPage/>} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
