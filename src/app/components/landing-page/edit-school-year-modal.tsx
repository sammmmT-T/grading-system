"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import { SchoolYear } from "@/types";

interface EditSchoolYearModalProps {
  schoolYear: SchoolYear;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (editedYear: SchoolYear) => void;
}

const EditSchoolYearModal: React.FC<EditSchoolYearModalProps> = ({
  schoolYear,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [startYear, setStartYear] = useState(schoolYear.startYear.toString());
  const [endYear, setEndYear] = useState(schoolYear.endYear.toString());
  const [error, setError] = useState("");

  useEffect(() => {
    setStartYear(schoolYear.startYear.toString());
    setEndYear(schoolYear.endYear.toString());
  }, [schoolYear]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const start = Number.parseInt(startYear);
    const end = Number.parseInt(endYear);

    if (isNaN(start) || isNaN(end)) {
      setError("Both years must be valid numbers.");
      return;
    }

    if (end !== start + 1) {
      setError("End year must be one year after the start year.");
      return;
    }

    onConfirm({ ...schoolYear, startYear: start, endYear: end });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit School Year</DialogTitle>
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
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSchoolYearModal;
