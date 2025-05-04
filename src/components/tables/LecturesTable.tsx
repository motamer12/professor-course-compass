
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { LectureData } from "@/components/modals/LectureFormModal";
import { cn } from "@/lib/utils";

interface LecturesTableProps {
  lectures: LectureData[];
  onEdit: (lecture: LectureData) => void;
  onDelete: (lectureId: number) => void;
  onView: (lecture: LectureData) => void;
}

const LecturesTable = ({ lectures, onEdit, onDelete, onView }: LecturesTableProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lecture Title</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lectures.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-medium-gray py-8">
                No lectures available
              </TableCell>
            </TableRow>
          ) : (
            lectures.map((lecture, index) => (
              <TableRow 
                key={lecture.id} 
                onMouseEnter={() => setHoveredRow(lecture.id || -1)}
                onMouseLeave={() => setHoveredRow(null)}
                className={cn(
                  "transition-all duration-300", 
                  hoveredRow === lecture.id ? "bg-gray-50" : "",
                  `animate-slide-in [animation-delay:${index * 0.05}s]`
                )}
              >
                <TableCell className="font-medium">{lecture.title}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onView(lecture)}
                      className="hover:bg-primary/10 hover:text-primary"
                      title="View Lecture"
                    >
                      <Eye size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onEdit(lecture)}
                      className="hover:bg-primary/10 hover:text-primary" 
                      title="Edit Lecture"
                    >
                      <Pencil size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onDelete(lecture.id || 0)}
                      className="hover:bg-destructive/10 hover:text-destructive" 
                      title="Delete Lecture"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LecturesTable;
