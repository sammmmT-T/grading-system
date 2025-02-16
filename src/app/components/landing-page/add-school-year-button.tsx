"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddSchoolYearModal from "./add-school-year-modal";

const AddSchoolYearButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center space-x-2"
      >
        <PlusCircle size={20} />
        <span>Add School Year</span>
      </Button>
      <AddSchoolYearModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AddSchoolYearButton;
