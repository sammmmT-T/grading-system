"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import EditSchoolYearModal from "./edit-school-year-modal";
import DeleteConfirmationModal from "./delete-confirmation-modal";

interface SchoolYear {
  id: string;
  startYear: number;
  endYear: number;
}

const SchoolYearAccordion = () => {
  const currentYear = new Date().getFullYear();
  const initialSchoolYears: SchoolYear[] = Array.from(
    { length: 10 },
    (_, i) => ({
      id: `${currentYear - i}`,
      startYear: currentYear - i,
      endYear: currentYear - i + 1,
    })
  );

  const [schoolYears, setSchoolYears] = useState(initialSchoolYears);
  const [editingYear, setEditingYear] = useState<SchoolYear | null>(null);
  const [deletingYear, setDeletingYear] = useState<SchoolYear | null>(null);

  const handleEdit = (year: SchoolYear) => {
    setEditingYear(year);
  };

  const handleDelete = (year: SchoolYear) => {
    setDeletingYear(year);
  };

  const handleEditConfirm = (editedYear: SchoolYear) => {
    setSchoolYears((years) =>
      years.map((year) => (year.id === editedYear.id ? editedYear : year))
    );
    setEditingYear(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingYear) {
      setSchoolYears((years) =>
        years.filter((year) => year.id !== deletingYear.id)
      );
      setDeletingYear(null);
    }
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {schoolYears.map((year) => (
          <AccordionItem
            key={year.id}
            value={year.id}
            className="border-b border-gray-200"
          >
            <AccordionTrigger className="w-full hover:bg-blue-50 transition-colors duration-200">
              <div className="flex items-center justify-between w-full px-4 py-4">
                <span className="text-lg font-semibold">
                  School Year {year.startYear} - {year.endYear}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(year);
                    }}
                    className="text-green-600 hover:text-green-700 hover:bg-green-100"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(year);
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-4 pr-4 py-2">
                <Accordion type="multiple" className="pl-4">
                  <AccordionItem value={`${year.id}-first`}>
                    <AccordionTrigger>First Semester</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Classes begin: August {year.startYear}</li>
                        <li>Midterm exams: October {year.startYear}</li>
                        <li>Finals week: December {year.startYear}</li>
                        <li>
                          Winter break: December {year.startYear} - January{" "}
                          {year.endYear}
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value={`${year.id}-second`}>
                    <AccordionTrigger>Second Semester</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Classes resume: January {year.endYear}</li>
                        <li>Spring break: March {year.endYear}</li>
                        <li>Finals week: May {year.endYear}</li>
                        <li>Commencement: June {year.endYear}</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
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
