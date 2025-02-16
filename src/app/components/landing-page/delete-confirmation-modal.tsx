import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface SchoolYear {
  id: string
  startYear: number
  endYear: number
}

interface DeleteConfirmationModalProps {
  schoolYear: SchoolYear
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  schoolYear,
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertTriangle className="mr-2" size={24} />
            Confirm Deletion
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to delete the school year {schoolYear.startYear} - {schoolYear.endYear}?
          </p>
          <p className="mt-2 text-red-600 font-semibold">
            All of its data will be permanently deleted and this action is irreversible.
          </p>
        </div>
        <DialogFooter className="space-x-4">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmationModal

