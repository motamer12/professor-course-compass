
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LectureDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lecture: {
    id: number;
    title: string;
    date: string;
    content: string;
  };
}

const LectureDetailsModal = ({
  isOpen,
  onClose,
  lecture,
}: LectureDetailsModalProps) => {
  const formattedDate = new Date(lecture.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg animate-fade-in">
        <DialogHeader>
          <DialogTitle>{lecture.title}</DialogTitle>
          <DialogDescription>
            {formattedDate}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-72">
          <div className="space-y-4 p-2">
            <div className="whitespace-pre-wrap">
              {lecture.content}
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Attachments</h4>
              <p className="text-medium-gray italic">No attachments available</p>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LectureDetailsModal;
