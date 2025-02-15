"use client";

import { useAuthContext } from "@/context/AuthContext";
import SignOut from "@/components/sign-out";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  Pencil,
  Save,
  X,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the structure of a student record
interface Student {
  id: number
  name: string
  course: string
  section: string
  grade: number
  status: string
}

// Sample data (updated for new grading scale)
const initialStudents: Student[] = [
  { id: 1, name: "Alice Johnson", course: "Mathematics", section: "A", grade: 1.25, status: "Passed" },
  { id: 2, name: "Bob Smith", course: "Physics", section: "B", grade: 1.5, status: "Passed" },
  { id: 3, name: "Charlie Brown", course: "Chemistry", section: "A", grade: 2.0, status: "Passed" },
  { id: 4, name: "Diana Ross", course: "Biology", section: "C", grade: 5.0, status: "Failed" },
  { id: 5, name: "Ethan Hunt", course: "Computer Science", section: "B", grade: 1.0, status: "Passed" },
  { id: 6, name: "Fiona Apple", course: "Music", section: "A", grade: 1.75, status: "Passed" },
  { id: 7, name: "George Orwell", course: "Literature", section: "C", grade: 1.25, status: "Passed" },
  { id: 8, name: "Hannah Montana", course: "Drama", section: "B", grade: 2.0, status: "Passed" },
  { id: 9, name: "Ian McKellen", course: "Theater", section: "A", grade: 1.0, status: "Passed" },
  { id: 10, name: "Julia Roberts", course: "Film Studies", section: "C", grade: 1.5, status: "Passed" },
  { id: 11, name: "Kevin Hart", course: "Comedy", section: "B", grade: 1.25, status: "Passed" },
  { id: 12, name: "Liam Neeson", course: "Action Studies", section: "A", grade: 1.75, status: "Passed" },
]

type SortField = keyof Student
type SortOrder = "asc" | "desc"


export default function Page() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editedStudent, setEditedStudent] = useState<Student | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ field: SortField; order: SortOrder }>({ field: "name", order: "asc" })

  const itemsPerPage = 5

  // Sorting function
  const sortedStudents = useMemo(() => {
    const sortableStudents = [...students]
    if (sortConfig.field) {
      sortableStudents.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.order === "asc" ? -1 : 1
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.order === "asc" ? 1 : -1
        }
        return 0
      })
    }
    return sortableStudents
  }, [students, sortConfig])

  // Filtering function
  const filteredStudents = useMemo(() => {
    return sortedStudents.filter((student) =>
      Object.values(student).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }, [sortedStudents, searchTerm])

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleEdit = (student: Student) => {
    setEditingId(student.id)
    setEditedStudent({ ...student })
  }

  const handleSave = () => {
    if (editedStudent) {
      setStudents(students.map((s) => (s.id === editedStudent.id ? editedStudent : s)))
      setEditingId(null)
      setEditedStudent(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditedStudent(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedStudent) {
      setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value })
    }
  }

  const handleSelectChange = (value: string, field: string) => {
    if (editedStudent) {
      setEditedStudent({ ...editedStudent, [field]: value })
    }
  }

  const handleGradeChange = (value: number[]) => {
    if (editedStudent) {
      const newGrade = Math.min(Math.max(value[0], 1), 5)
      setEditedStudent({ ...editedStudent, grade: newGrade })
    }
  }

  const handleSort = (field: SortField) => {
    setSortConfig((prevConfig) => ({
      field,
      order: prevConfig.field === field && prevConfig.order === "asc" ? "desc" : "asc",
    }))
  }

  const renderSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ChevronsUpDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
    }
    return sortConfig.order === "asc" ? (
      <ChevronUpIcon className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDownIcon className="ml-2 h-4 w-4" />
    )
  }

  const getGradeColor = (grade: number) => {
    if (grade <= 1.25) return "bg-green-100 text-green-800"
    if (grade <= 1.75) return "bg-blue-100 text-blue-800"
    if (grade <= 2.25) return "bg-yellow-100 text-yellow-800"
    if (grade <= 2.75) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  useEffect(() => {
    // Redirect to sign-in page if not authenticated
    if (!loading && !user) {
      router.push("pages/sign-in");
    }
  }, [loading, user, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">
        Hello, {user?.displayName || "User"}!
      </h1>
      <SignOut />
      <div className="container mx-auto py-10 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Student Grading System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {paginatedStudents.length} of {students.length} students
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary hover:bg-primary">
                <TableHead className="w-[50px] text-primary-foreground">#</TableHead>
                <TableHead
                  className="w-[200px] cursor-pointer text-primary-foreground"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">Name {renderSortIcon("name")}</div>
                </TableHead>
                <TableHead
                  className="w-[200px] cursor-pointer text-primary-foreground"
                  onClick={() => handleSort("course")}
                >
                  <div className="flex items-center">Course {renderSortIcon("course")}</div>
                </TableHead>
                <TableHead
                  className="w-[100px] cursor-pointer text-primary-foreground"
                  onClick={() => handleSort("section")}
                >
                  <div className="flex items-center">Section {renderSortIcon("section")}</div>
                </TableHead>
                <TableHead
                  className="w-[120px] cursor-pointer text-primary-foreground"
                  onClick={() => handleSort("grade")}
                >
                  <div className="flex items-center">Grade {renderSortIcon("grade")}</div>
                </TableHead>
                <TableHead
                  className="w-[100px] cursor-pointer text-primary-foreground"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">Status {renderSortIcon("status")}</div>
                </TableHead>
                <TableHead className="w-[100px] text-primary-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map((student, index) => (
                <TableRow key={student.id} className={editingId === student.id ? "bg-muted/50" : ""}>
                  <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>
                    {editingId === student.id ? (
                      <Input
                        name="name"
                        value={editedStudent?.name}
                        onChange={handleChange}
                        className="max-w-[180px]"
                      />
                    ) : (
                      student.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === student.id ? (
                      <Input
                        name="course"
                        value={editedStudent?.course}
                        onChange={handleChange}
                        className="max-w-[150px]"
                      />
                    ) : (
                      student.course
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === student.id ? (
                      <Select
                        value={editedStudent?.section}
                        onValueChange={(value) => handleSelectChange(value, "section")}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      student.section
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === student.id ? (
                      <Input
                        type="number"
                        name="grade"
                        value={editedStudent?.grade.toFixed(2)}
                        onChange={(e) => handleGradeChange([Number.parseFloat(e.target.value)])}
                        min={1}
                        max={5}
                        step={0.01}
                        className="w-[100px]"
                      />
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(student.grade)}`}>
                        {student.grade.toFixed(2)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === "Passed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {editingId === student.id ? (
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} size="icon" variant="ghost" className="h-8 w-8 p-0">
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleCancel} size="icon" variant="ghost" className="h-8 w-8 p-0">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleEdit(student)}
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-end items-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
    </main>
  );
}
