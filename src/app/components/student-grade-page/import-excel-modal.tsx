import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  interface ImportExcelModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const ImportExcelModal: React.FC<ImportExcelModalProps> = ({
    isOpen,
    onClose,
  }) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Import Excel</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>This feature is not yet implemented.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ImportExcelModal;