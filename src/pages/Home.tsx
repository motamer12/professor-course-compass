
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/services/mockData";

const Home = () => {
  const [courses, setCourses] = useState(coursesData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-dark-gray">Dashboard</h1>
          <p className="text-medium-gray">
            Welcome back! You are managing {courses.length} courses.
          </p>
        </div>

        <div className="space-y-8">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              totalHours={course.totalHours}
              imageUrl={course.imageUrl}
              className={isLoaded ? "" : "opacity-0"}
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
