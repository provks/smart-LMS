import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const backendURL = "http://localhost:3002";

export default function CourseDetail() {
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { id: courseId } = useParams();
  console.log(courseId);

  //   call the get courses api
  useEffect(() => {
    // fetch the data using axios
    const fetchCourseById = async () => {
      try {
        const response = await axios.get(
          backendURL + "/api/courses/" + courseId
        );
        // save into state
        setCourse(response.data);
        console.log("course detail =>", response.data);
      } catch (error) {
        console.error("Error in fetching course", error);
        setError("Course not found");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourseById();
  }, []);

  if (isLoading) return <p>Loading course details</p>;
  if (error) return <p>Course not found</p>;

  return (
    <>
      {course ? (
        <>
          <h1>Title: {course.title}</h1>
          <p>Description: {course.description}</p>
          <p>Instructor: {course.instructor.name}</p>
          <p>Price: {course.price}</p>
          <p>Category: {course.category.name}</p>
          <button>Add to cart</button>
          <button>Buy Now</button>
        </>
      ) : (
        <h1>Course not found</h1>
      )}
    </>
  );
}
