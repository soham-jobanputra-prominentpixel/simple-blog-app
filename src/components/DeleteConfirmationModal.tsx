import Button from "./Button.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog.tsx";

type DeleteConfirmationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

export function DeleteConfirmationModal({
  open,
  onOpenChange,
  onDelete,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-black bg-white text-black">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-black text-2xl">
            Delete Confirmation
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <DialogDescription className="text-black text-xl">
          Are you sure you want to delete this blog?
        </DialogDescription>

        {/* Footer with actions */}
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button
              text="Cancel"
              type="button"
              className="border border-black text-black bg-white hover:bg-black hover:text-white"
            />
          </DialogClose>
          <Button
            text="Delete"
            type="button"
            onClick={onDelete}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
