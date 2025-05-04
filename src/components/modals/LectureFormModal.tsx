
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LectureFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lecture: LectureData) => void;
  initialData?: LectureData;
  courseId: number;
}

export interface LectureData {
  id: number;
  title: string;
  courseId: number;
  attachment?: File | null;
  attachmentURL?: string;
}

const LectureFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  courseId,
}: LectureFormModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<LectureData>(
    initialData || {
      id: 0,
      title: "",
      courseId: courseId,
      attachment: null,
      attachmentURL: "",
    }
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only",
        className: "bg-destructive text-white animate-slide-in-right",
        duration: 3000,
      });
      return;
    }
    
    setSelectedFile(file);
    setFormData(prev => ({ 
      ...prev, 
      attachment: file,
      // Create a temporary URL for display purposes
      attachmentURL: URL.createObjectURL(file)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        className: "bg-destructive text-white animate-slide-in-right",
        duration: 3000,
      });
      return;
    }
    
    // In a real app, file would be uploaded to server
    // For now, we just pass the file name and create a mock URL
    const dataToSubmit: LectureData = {
      ...formData,
      // Only add attachmentURL if we have a file and it's not already set
      attachmentURL: selectedFile ? 
        URL.createObjectURL(selectedFile) : 
        (formData.attachmentURL || "")
    };
    
    onSubmit(dataToSubmit);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-fade-in">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Lecture" : "Add New Lecture"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for this lecture.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="attachment">Attachment (PDF only)</Label>
              <Input
                id="attachment"
                name="attachment"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {(selectedFile || formData.attachmentURL) && (
                <div className="text-sm text-muted-foreground">
                  {selectedFile ? selectedFile.name : "Current file attached"}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LectureFormModal;
