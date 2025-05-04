
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id: number;
  title: string;
  totalHours: number;
  imageUrl: string;
  className?: string;
}

const CourseCard = ({ id, title, totalHours, imageUrl, className }: CourseCardProps) => {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    navigate(`/courses/${id}`);
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto overflow-hidden card-shadow animate-slide-in", className)}>
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
