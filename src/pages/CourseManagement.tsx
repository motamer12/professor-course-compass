
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LecturesTable from "@/components/tables/LecturesTable";
import AssignmentsTable from "@/components/tables/AssignmentsTable";
import SubmissionsTable from "@/components/tables/SubmissionsTable";
import LectureFormModal from "@/components/modals/LectureFormModal";
import LectureDetailsModal from "@/components/modals/LectureDetailsModal";
import AssignmentFormModal from "@/components/modals/AssignmentFormModal";
import DeadlineModal from "@/components/modals/DeadlineModal";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { LectureData } from "@/components/modals/LectureFormModal";
import { AssignmentData } from "@/components/modals/AssignmentFormModal";
import { useToast } from "@/hooks/use-toast";
import { 
  getCourse, 
  getLectures, 
  getAssignments, 
  getSubmissions 
} from "@/services/mockData";

const CourseManagement = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const courseIdNum = parseInt(courseId || "0");
  const course = getCourse(courseIdNum);
  const { toast } = useToast();
  
  // States for lectures tab
  const [lectures, setLectures] = useState<LectureData[]>([]);
  const [isLectureFormOpen, setIsLectureFormOpen] = useState(false);
  const [isLectureDetailsOpen, setIsLectureDetailsOpen] = useState(false);
  const [isDeleteLectureModalOpen, setIsDeleteLectureModalOpen] = useState(false);
  const [currentLecture, setCurrentLecture] = useState<LectureData | null>(null);
  const [selectedLectureId, setSelectedLectureId] = useState<number>(0);
  
  // States for assignments tab
  const [assignments, setAssignments] = useState<AssignmentData[]>([]);
  const [isAssignmentFormOpen, setIsAssignmentFormOpen] = useState(false);
  const [isDeadlineModalOpen, setIsDeadlineModalOpen] = useState(false);
  const [isDeleteAssignmentModalOpen, setIsDeleteAssignmentModalOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState<AssignmentData | null>(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<number>(0);
  
  // States for submissions tab
  const [isSubmissionsVisible, setIsSubmissionsVisible] = useState(false);
  const [currentSubmissionAssignment, setCurrentSubmissionAssignment] = useState<AssignmentData | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  
  // Active tab state
  const [activeTab, setActiveTab] = useState("lectures");

  // Load course data
  useEffect(() => {
    if (courseIdNum > 0) {
      setLectures(getLectures(courseIdNum));
      setAssignments(getAssignments(courseIdNum));
    }
  }, [courseIdNum]);

  // Lectures handlers
  const handleAddLecture = () => {
    // When adding a new lecture, set currentLecture to null but with a default ID of 0
    setCurrentLecture(null);
    setIsLectureFormOpen(true);
  };

  const handleEditLecture = (lecture: LectureData) => {
    setCurrentLecture(lecture);
    setIsLectureFormOpen(true);
  };

  const handleViewLectureDetails = (lecture: LectureData) => {
    setCurrentLecture(lecture);
    setIsLectureDetailsOpen(true);
  };

  const handleDeleteLectureClick = (lectureId: number) => {
    setSelectedLectureId(lectureId);
    setIsDeleteLectureModalOpen(true);
  };

  const handleLectureDelete = () => {
    const updatedLectures = lectures.filter(
      (lecture) => lecture.id !== selectedLectureId
    );
    setLectures(updatedLectures);
    setIsDeleteLectureModalOpen(false);
    toast({
      title: "Lecture deleted successfully",
      className: "bg-secondary text-white animate-slide-in-right",
      duration: 3000,
    });
  };

  const handleLectureSubmit = (lectureData: LectureData) => {
    if (lectureData.id) {
      // Update existing lecture
      const updatedLectures = lectures.map((lecture) =>
        lecture.id === lectureData.id ? lectureData : lecture
      );
      setLectures(updatedLectures);
      toast({
        title: "Lecture updated successfully",
        className: "bg-secondary text-white animate-slide-in-right",
        duration: 3000,
      });
    } else {
      // Add new lecture with a new ID
      const newLecture = {
        ...lectureData,
        id: Math.max(0, ...lectures.map((l) => l.id)) + 1,
      };
      setLectures([...lectures, newLecture]);
      toast({
        title: "New lecture added",
        className: "bg-secondary text-white animate-slide-in-right",
        duration: 3000,
      });
    }
  };

  // Assignments handlers
  const handleAddAssignment = () => {
    setCurrentAssignment(null);
    setIsAssignmentFormOpen(true);
  };

  const handleEditAssignment = (assignment: AssignmentData) => {
    setCurrentAssignment(assignment);
    setIsAssignmentFormOpen(true);
  };

  const handleSetDeadline = (assignment: AssignmentData) => {
    setCurrentAssignment(assignment);
    setIsDeadlineModalOpen(true);
  };

  const handleDeleteAssignmentClick = (assignmentId: number) => {
    setSelectedAssignmentId(assignmentId);
    setIsDeleteAssignmentModalOpen(true);
  };

  const handleAssignmentDelete = () => {
    const updatedAssignments = assignments.filter(
      (assignment) => assignment.id !== selectedAssignmentId
    );
    setAssignments(updatedAssignments);
    setIsDeleteAssignmentModalOpen(false);
    toast({
      title: "Assignment deleted successfully",
      className: "bg-secondary text-white animate-slide-in-right",
      duration: 3000,
    });
  };

  const handleAssignmentSubmit = (assignmentData: AssignmentData) => {
    if (assignmentData.id) {
      // Update existing assignment
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === assignmentData.id ? assignmentData : assignment
      );
      setAssignments(updatedAssignments);
      toast({
        title: "Assignment updated successfully",
        className: "bg-secondary text-white animate-slide-in-right",
        duration: 3000,
      });
    } else {
      // Add new assignment
      const newAssignment = {
        ...assignmentData,
        id: Math.max(0, ...assignments.map((a) => a.id || 0)) + 1,
      };
      setAssignments([...assignments, newAssignment]);
      toast({
        title: "New assignment added",
        className: "bg-secondary text-white animate-slide-in-right",
        duration: 3000,
      });
    }
  };

  const handleDeadlineUpdate = (newDeadline: string) => {
    if (currentAssignment) {
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === currentAssignment.id
          ? { ...assignment, deadline: newDeadline }
          : assignment
      );
      setAssignments(updatedAssignments);
      setIsDeadlineModalOpen(false);
      toast({
        title: "Deadline updated successfully",
        className: "bg-secondary text-white animate-slide-in-right",
        duration: 3000,
      });
    }
  };

  // Submissions handlers
  const handleViewSubmissions = (assignmentId: number) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      setCurrentSubmissionAssignment(assignment);
      setSubmissions(getSubmissions(assignmentId));
      setIsSubmissionsVisible(true);
      setActiveTab("submissions");
    }
  };

  const handleBackToAssignments = () => {
    setIsSubmissionsVisible(false);
    setActiveTab("assignments");
  };

  const handleDownloadSubmission = (submissionId: number) => {
    // In a real app, this would trigger a file download
    toast({
      title: "Download started",
      description: "The file is being downloaded to your device.",
      className: "bg-secondary text-white animate-slide-in-right",
      duration: 3000,
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-dark-gray">{course?.title}</h1>
          <p className="text-medium-gray">Total Hours: {course?.totalHours}</p>
        </div>

        <Tabs defaultValue="lectures" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="lectures">Lectures</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            {isSubmissionsVisible && (
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="lectures" className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Course Lectures</h2>
              <Button onClick={handleAddLecture} className="bg-primary text-white btn-hover">
                <Plus className="w-4 h-4 mr-2" />
                Add Lecture
              </Button>
            </div>

            <LecturesTable
              lectures={lectures}
              onEdit={handleEditLecture}
              onDelete={handleDeleteLectureClick}
              onView={handleViewLectureDetails}
            />

            {/* Lecture Form Modal */}
            {isLectureFormOpen && (
              <LectureFormModal
                isOpen={isLectureFormOpen}
                onClose={() => setIsLectureFormOpen(false)}
                onSubmit={handleLectureSubmit}
                initialData={currentLecture || undefined}
                courseId={courseIdNum}
              />
            )}

            {/* Lecture Details Modal */}
            {isLectureDetailsOpen && currentLecture && (
              <LectureDetailsModal
                isOpen={isLectureDetailsOpen}
                onClose={() => setIsLectureDetailsOpen(false)}
                lecture={currentLecture}
              />
            )}

            {/* Delete Lecture Confirmation */}
            <ConfirmationModal
              isOpen={isDeleteLectureModalOpen}
              onClose={() => setIsDeleteLectureModalOpen(false)}
              onConfirm={handleLectureDelete}
              title="Delete Lecture"
              description="Are you sure you want to delete this lecture? This action cannot be undone."
              confirmText="Delete"
              destructive={true}
            />
          </TabsContent>

          <TabsContent value="assignments" className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Course Assignments</h2>
              <Button onClick={handleAddAssignment} className="bg-primary text-white btn-hover">
                <Plus className="w-4 h-4 mr-2" />
                Add Assignment
              </Button>
            </div>

            <AssignmentsTable
              assignments={assignments}
              onEdit={handleEditAssignment}
              onDelete={handleDeleteAssignmentClick}
              onSetDeadline={handleSetDeadline}
              onViewSubmissions={handleViewSubmissions}
            />

            {/* Assignment Form Modal */}
            {isAssignmentFormOpen && (
              <AssignmentFormModal
                isOpen={isAssignmentFormOpen}
                onClose={() => setIsAssignmentFormOpen(false)}
                onSubmit={handleAssignmentSubmit}
                initialData={currentAssignment || undefined}
                courseId={courseIdNum}
              />
            )}

            {/* Deadline Modal */}
            {isDeadlineModalOpen && currentAssignment && (
              <DeadlineModal
                isOpen={isDeadlineModalOpen}
                onClose={() => setIsDeadlineModalOpen(false)}
                onSubmit={handleDeadlineUpdate}
                assignmentTitle={currentAssignment.title}
                currentDeadline={currentAssignment.deadline}
              />
            )}

            {/* Delete Assignment Confirmation */}
            <ConfirmationModal
              isOpen={isDeleteAssignmentModalOpen}
              onClose={() => setIsDeleteAssignmentModalOpen(false)}
              onConfirm={handleAssignmentDelete}
              title="Delete Assignment"
              description="Are you sure you want to delete this assignment? This action cannot be undone."
              confirmText="Delete"
              destructive={true}
            />
          </TabsContent>

          <TabsContent value="submissions" className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {currentSubmissionAssignment?.title} - Submissions
                </h2>
                <p className="text-medium-gray">
                  Deadline: {currentSubmissionAssignment?.deadline && new Date(currentSubmissionAssignment.deadline).toLocaleDateString()}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleBackToAssignments}
                className="btn-hover"
              >
                Back to Assignments
              </Button>
            </div>

            <SubmissionsTable
              submissions={submissions}
              onDownload={handleDownloadSubmission}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CourseManagement;
