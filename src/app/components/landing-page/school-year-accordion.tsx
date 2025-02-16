"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, ChevronDown } from "lucide-react";
import EditSchoolYearModal from "./edit-school-year-modal";
import DeleteConfirmationModal from "./delete-confirmation-modal";
import { SchoolYear } from "@/types";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import NoData from "@/components/landing-page/no-data";

interface SchoolYearAccordionProps {
  setSelectedSchoolYearAndSemester: (date: SchoolYear | null) => void;
}

const SchoolYearAccordion = ({
  setSelectedSchoolYearAndSemester,
}: SchoolYearAccordionProps) => {
  const [editingYear, setEditingYear] = useState<SchoolYear | null>(null);
  const [deletingYear, setDeletingYear] = useState<SchoolYear | null>(null);
  const [openItems, setOpenItems] = useState<string[]>([]);

  // Fetch SchoolYear collection using useCollection hook
  const [schoolYearsSnapshot, loading, error] = useCollection(
    collection(db, "SchoolYear")
  );

  let schoolYears = schoolYearsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as SchoolYear[];

  // Sort school years in descending order
  schoolYears = schoolYears?.sort((a, b) => b.startYear - a.startYear);

  const handleEdit = (e: React.MouseEvent, year: SchoolYear) => {
    e.stopPropagation();
    setEditingYear(year);
  };

  const handleDelete = (e: React.MouseEvent, year: SchoolYear) => {
    e.stopPropagation();
    setDeletingYear(year);
  };

  const handleEditConfirm = async (editedYear: SchoolYear) => {
    try {
      const yearDoc = doc(db, "SchoolYear", editedYear.id);
      await updateDoc(yearDoc, {
        startYear: editedYear.startYear,
        endYear: editedYear.endYear,
      });
      setEditingYear(null);
      setSelectedSchoolYearAndSemester(null);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingYear) {
      try {
        const yearDoc = doc(db, "SchoolYear", deletingYear.id);
        await deleteDoc(yearDoc);
        setDeletingYear(null);
        setSelectedSchoolYearAndSemester(null);
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  const toggleAccordion = (yearId: string) => {
    setOpenItems((prev) =>
      prev.includes(yearId)
        ? prev.filter((id) => id !== yearId)
        : [...prev, yearId]
    );
  };

  const handleSemesterClick = (year: SchoolYear, semester: string) => {
    setSelectedSchoolYearAndSemester({
      ...year,
      semester,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {schoolYears.length === 0 ? (
        <NoData />
      ) : (
        <Accordion
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
          className="w-full"
        >
          {schoolYears.map((year) => (
            <AccordionItem
              key={year.id}
              value={year.id}
              className="border-b border-gray-200"
            >
              <div
                className="flex items-center justify-between w-full hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                onClick={() => toggleAccordion(year.id)}
              >
                <div className="flex-grow py-4 px-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    School Year {year.startYear} - {year.endYear}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      openItems.includes(year.id) ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
                <div className="flex space-x-2 pr-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleEdit(e, year)}
                    className="text-green-600 hover:text-green-700 hover:bg-green-100"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleDelete(e, year)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <AccordionContent>
                <div className="pl-4 pr-4 py-2">
                  <div
                    className="cursor-pointer hover:underline text-blue-600 font-medium hover:bg-blue-50 text-lg"
                    onClick={() => handleSemesterClick(year, "first")}
                  >
                    First Semester
                  </div>
                  <div
                    className="cursor-pointer hover:underline text-blue-600 font-medium mt-2 hover:bg-blue-50 text-lg"
                    onClick={() => handleSemesterClick(year, "second")}
                  >
                    Second Semester
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      {editingYear && (
        <EditSchoolYearModal
          schoolYear={editingYear}
          isOpen={!!editingYear}
          onClose={() => setEditingYear(null)}
          onConfirm={handleEditConfirm}
        />
      )}
      {deletingYear && (
        <DeleteConfirmationModal
          schoolYear={deletingYear}
          isOpen={!!deletingYear}
          onClose={() => setDeletingYear(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};

export default SchoolYearAccordion;
