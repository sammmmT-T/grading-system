import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  startYear: number;
  endYear: number;
  semester: string;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  startYear,
  endYear,
  semester,
}) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [section, setSection] = useState("");
  const [grade, setGrade] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !course || !section || !grade) {
      setError("All fields are required.");
      return;
    }

    try {
      await addDoc(collection(db, "students"), {
        name,
        course,
        section,
        grade: parseFloat(grade),
        startYear,
        endYear,
        semester,
      });
      onClose();
    } catch (error) {
      setError("Failed to add student. Please try again.");
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <Input
            placeholder="Section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
          <Input
            placeholder="Grade"
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            min={1}
            max={5}
            step={0.01}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Student
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;
