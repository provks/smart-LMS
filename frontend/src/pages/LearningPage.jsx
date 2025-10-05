import { useEffect, useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from 'axios';
import { useAuth } from "../context/AuthContext";

const LearningPage = () => {
  const[courses, setCourses] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const {user} = useAuth;

  useEffect(() => {
    // fetch courses from get courses endpoint
    const getMyCourses = async () => {
      setIsloading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user}`
          }
        }
        const myCourses = await axios.get(BACKEND_URL+'/api/courses/my-courses', config);
        setCourses(myCourses);
      } catch (error) {
        console.error('Error fetching my courses!', error.message)
      } finally {
        setIsloading(false);
      }
    }

    if (user) {
      getMyCourses();
    }

  }, [user]);

  if (isLoading) return <p>Loading your courses!</p>

  return (
    <>
     <div className="container mt-4">
      <h1>My Learning Center</h1>
      <div className="row">
        {courses.map(course => (
          <div key={course._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              {/* Optional course image */}
              {course.image && (
                <img
                  src={course.image}
                  className="card-img-top"
                  alt={course.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text text-muted">
                  {course.description?.slice(0, 80) || "No description available."}...
                </p>

                <div className="mt-auto">
                  <Link
                    to={`/learn/courses/${course._id}`}
                    className="btn btn-primary w-100"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default LearningPage