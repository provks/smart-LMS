import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get('/api/categories');
      console.log("🚀 ~ fetchCategories ~ data:", data)
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const params = new URLSearchParams();
      console.log("🚀 ~ fetchCourses ~ searchTerm:", searchTerm)
      if (searchTerm) params.append('keyword', searchTerm);
      console.log("🚀 ~ fetchCourses ~ selectedCategory:", selectedCategory)
      if (selectedCategory) params.append('category', selectedCategory);
      
      const { data } = await axios.get(`/api/courses?${params.toString()}`);
      console.log("🚀 ~ fetchCourses ~ data:", data)
      setCourses(data);
    };
    fetchCourses();
  }, [searchTerm, selectedCategory]); 

  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '250px', padding: '1rem' }}>
        <h3>Filters</h3>
        <input 
          type="text" 
          placeholder="Search courses..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        
        <h4>Categories</h4>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        {/* Price range slider would go here */}
      </aside>
      <main style={{ flex: 1, padding: '1rem' }}>
        <h2>Showing {courses.length} Courses</h2>
        <div className="course-grid">
          {courses.map(course => (
            <div key={course._id} style={{ border: '1px solid #ccc', margin: '0.5rem', padding: '1rem' }}>
              <h3>{course.title}</h3>
              <p>Category: {course.category.name}</p>
              <Link to={`/courses/${course._id}`}>View Details</Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;
