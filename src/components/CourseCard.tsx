import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import React from "react"; // Add React import for CSSProperties

interface CourseCardProps {
  id: number;
  title: string;
  totalHours: number;
  imageUrl: string;
  className?: string;
  style?: React.CSSProperties; // Add style prop
}

const CourseCard = ({ id, title, totalHours, imageUrl, className, style }: CourseCardProps) => {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    navigate(`/eduverse/professor/courses/${id}`);
  };

  return (
    <Card 
      className={cn("w-full max-w-md mx-auto overflow-hidden card-shadow animate-slide-in", className)} 
      style={style} // Add style prop to the Card component
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-2 text-dark-gray">{title}</h3>
        <p className="text-medium-gray">Total Hours: {totalHours}</p>
      </CardContent>
      <CardFooter className="pb-6">
        <Button 
          onClick={handleViewCourse} 
          className="w-full bg-primary text-white btn-hover"
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
