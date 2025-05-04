
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
import { Pencil, Trash2, Calendar } from "lucide-react";
import { AssignmentData } from "@/components/modals/AssignmentFormModal";
import { cn } from "@/lib/utils";

interface AssignmentsTableProps {
  assignments: AssignmentData[];
  onEdit: (assignment: AssignmentData) => void;
  onDelete: (assignmentId: number) => void;
  onSetDeadline: (assignment: AssignmentData) => void;
  onViewSubmissions: (assignmentId: number) => void;
}

const AssignmentsTable = ({ 
  assignments, 
  onEdit, 
  onDelete, 
  onSetDeadline,
  onViewSubmissions 
}: AssignmentsTableProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Assignment Title</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-medium-gray py-8">
                No assignments available
              </TableCell>
            </TableRow>
          ) : (
            assignments.map((assignment, index) => (
              <TableRow 
                key={assignment.id}
                onMouseEnter={() => setHoveredRow(assignment.id || -1)}
                onMouseLeave={() => setHoveredRow(null)}
                className={cn(
                  "transition-all duration-300 cursor-pointer", 
                  hoveredRow === assignment.id ? "bg-gray-50" : "",
                  `animate-slide-in [animation-delay:${index * 0.05}s]`
                )}
                onClick={() => onViewSubmissions(assignment.id || 0)}
              >
                <TableCell className="font-medium">{assignment.title}</TableCell>
                <TableCell>{formatDate(assignment.deadline)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSetDeadline(assignment);
                      }}
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Calendar size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(assignment);
                      }}
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Pencil size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(assignment.id || 0);
                      }}
                      className="hover:bg-destructive/10 hover:text-destructive"
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

export default AssignmentsTable;
