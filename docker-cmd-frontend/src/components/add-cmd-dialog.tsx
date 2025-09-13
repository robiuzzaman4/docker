import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addCmd } from "@/utils/add-cmd";

type AddCmdDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddCmdDialog = ({ open, setOpen }: AddCmdDialogProps) => {
  // === input states ===
  const [cmd, setCmd] = useState("");
  const [description, setDescription] = useState("");

  // === query client ===
  const queryClient = useQueryClient();

  // === mutation hook ===
  const { mutate, isPending } = useMutation({
    mutationFn: addCmd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commands"] });
      setOpen(false);
      toast.success("New command added");
    },
    onError: (error) => {
      console.error("Failed to add command:", error);
      toast.error("Failed to add command");
    },
  });

  // === handle add cmd ===
  const handleAddCmd = () => {
    const payload = { cmd, description };
    mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add New Docker Command</DialogTitle>
          <DialogDescription className="sr-only">
            Add New Docker Command
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="cmd">CMD</Label>
            <Input
              id="cmd"
              name="cmd"
              placeholder="Enter cmd here"
              onChange={(e) => setCmd(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter description here"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAddCmd} disabled={isPending}>
            {isPending ? "Saving.." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
