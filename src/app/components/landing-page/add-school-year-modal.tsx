"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig"; // Ensure correct path to your firebaseConfig

interface AddSchoolYearModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSchoolYearModal: React.FC<AddSchoolYearModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!startYear || !endYear) {
      setError("Both years are required.");
      return;
    }

    if (Number.parseInt(endYear) !== Number.parseInt(startYear) + 1) {
      setError("End year must be one year after the start year.");
      return;
    }

    try {
      await addDoc(collection(db, "SchoolYear"), {
        startYear: Number.parseInt(startYear),
        endYear: Number.parseInt(endYear),
      });
      onClose();
    } catch (error) {
      setError("Failed to add school year. Please try again.");
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New School Year</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="startYear" className="text-right col-span-1">
              Year
            </Label>
            <Input
              id="startYear"
              className="col-span-2"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              placeholder="Start"
            />
            <span className="text-center col-span-1">-</span>
            <Input
              id="endYear"
              className="col-span-1"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              placeholder="End"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm flex items-center space-x-1">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add School Year
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSchoolYearModal;
