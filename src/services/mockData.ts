import { LectureData } from "@/components/modals/LectureFormModal";
import { AssignmentData } from "@/components/modals/AssignmentFormModal";
import { SubmissionData } from "@/components/tables/SubmissionsTable";

// Professor Data
export const professorData = {
  id: 1,
  name: "Dr. Jane Smith",
  email: "jane.smith@university.edu",
  department: "Computer Science",
  role: "Professor",
};

// Course Data
export const coursesData = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    totalHours: 48,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    totalHours: 36,
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    title: "Web Development Fundamentals",
    totalHours: 42,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    title: "Machine Learning Basics",
    totalHours: 54,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=60",
  },
];

// Lecture Data
export const lecturesData: Record<number, LectureData[]> = {
  1: [
    {
      id: 1,
      title: "Introduction to Programming Concepts",
      date: "2025-05-06",
      content: "This lecture covers the fundamental concepts of programming including variables, data types, and basic control structures.\n\nWe'll explore how programming languages work and what makes them different from natural languages. Students will get an overview of the compiler/interpreter process and how source code gets translated into machine code.\n\nBy the end of this lecture, students should understand the basic building blocks of all programming languages and be ready to start writing their first programs.",
      courseId: 1,
    },
    {
      id: 2,
      title: "Variables and Data Types",
      date: "2025-05-13",
      content: "In this lecture, we'll dive deeper into variables and the various data types used in programming including integers, floating-point numbers, characters, strings, and booleans.\n\nWe'll discuss memory allocation for different data types, type conversion, and why type safety matters in programming. Students will learn about variable naming conventions and scope.",
      courseId: 1,
    },
    {
      id: 3,
      title: "Control Structures",
      date: "2025-05-20",
      content: "This lecture explores conditional statements (if-else, switch) and loop structures (for, while, do-while) that allow for branching and iteration in programs.\n\nWe'll discuss how these control structures affect program flow and how to use them effectively to solve problems. Students will learn about loop invariants, infinite loops, and loop optimization.",
      courseId: 1,
    },
  ],
  2: [
    {
      id: 4,
      title: "Introduction to Data Structures",
      date: "2025-05-07",
      content: "This lecture introduces the concept of data structures and why they're important in computer science and programming.",
      courseId: 2,
    },
    {
      id: 5,
      title: "Arrays and Linked Lists",
      date: "2025-05-14",
      content: "In this lecture, we'll compare and contrast arrays and linked lists, discussing their implementations and use cases.",
      courseId: 2,
    },
  ],
};

// Assignment Data
export const assignmentsData: Record<number, AssignmentData[]> = {
  1: [
    {
      id: 1,
      title: "Hello World Program",
      description: "Write a simple program that outputs 'Hello, World!' to the console and includes your name as a comment.",
      deadline: "2025-05-13",
      courseId: 1,
    },
    {
      id: 2,
      title: "Calculator Program",
      description: "Create a basic calculator program that can perform addition, subtraction, multiplication, and division.",
      deadline: "2025-05-20",
      courseId: 1,
    },
    {
      id: 3,
      title: "Temperature Converter",
      description: "Build a program that converts temperatures between Celsius and Fahrenheit.",
      deadline: "2025-05-27",
      courseId: 1,
    },
  ],
  2: [
    {
      id: 4,
      title: "Array Implementation",
      description: "Implement a dynamic array class with basic operations (insert, delete, search).",
      deadline: "2025-05-14",
      courseId: 2,
    },
    {
      id: 5,
      title: "Linked List Implementation",
      description: "Implement a singly linked list with operations for insertion, deletion, and traversal.",
      deadline: "2025-05-21",
      courseId: 2,
    },
  ],
};

// Submissions Data
export const submissionsData: Record<number, SubmissionData[]> = {
  1: [
    {
      id: 1,
      studentName: "Alex Johnson",
      submissionTime: "2025-05-12T15:30:00",
      fileName: "alex_helloworld.py",
    },
    {
      id: 2,
      studentName: "Sarah Williams",
      submissionTime: "2025-05-11T14:22:00",
      fileName: "williams_hello.py",
    },
    {
      id: 3,
      studentName: "Michael Brown",
      submissionTime: "2025-05-13T09:15:00",
      fileName: "michael_helloworld.py",
    },
  ],
  2: [
    {
      id: 4,
      studentName: "Alex Johnson",
      submissionTime: "2025-05-19T16:45:00",
      fileName: "alex_calculator.py",
    },
    {
      id: 5,
      studentName: "Sarah Williams",
      submissionTime: "2025-05-18T17:30:00",
      fileName: "williams_calculator.py",
    },
  ],
  // Other assignments have no submissions yet
};

// Helper Functions
export const getCourse = (courseId: number) => {
  return coursesData.find(course => course.id === courseId);
};

export const getLectures = (courseId: number) => {
  return lecturesData[courseId] || [];
};

export const getAssignments = (courseId: number) => {
  return assignmentsData[courseId] || [];
};

export const getSubmissions = (assignmentId: number) => {
  return submissionsData[assignmentId] || [];
};
