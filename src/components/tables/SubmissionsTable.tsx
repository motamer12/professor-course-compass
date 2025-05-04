
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
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SubmissionData {
  id: number;
  studentName: string;
  submissionTime: string;
  fileName: string;
}

interface SubmissionsTableProps {
  submissions: SubmissionData[];
  onDownload: (submissionId: number) => void;
}

const SubmissionsTable = ({ submissions, onDownload }: SubmissionsTableProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Submission Time</TableHead>
            <TableHead>Uploaded File</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-medium-gray py-8">
                No submissions available
              </TableCell>
            </TableRow>
          ) : (
            submissions.map((submission, index) => (
              <TableRow 
                key={submission.id}
                onMouseEnter={() => setHoveredRow(submission.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={cn(
                  "transition-all duration-300", 
                  hoveredRow === submission.id ? "bg-gray-50" : "",
                  `animate-slide-in [animation-delay:${index * 0.05}s]`
                )}
              >
                <TableCell className="font-medium">{submission.studentName}</TableCell>
                <TableCell>{formatTime(submission.submissionTime)}</TableCell>
                <TableCell className="text-primary">{submission.fileName}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDownload(submission.id)}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <Download size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubmissionsTable;
