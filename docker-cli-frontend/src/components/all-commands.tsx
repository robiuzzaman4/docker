import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ICommand } from "@/types";
import { getAllCmd } from "@/utils/get-all-cmd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Loader, Trash } from "lucide-react";
import { deleteCmd } from "@/utils/delete-cmd";
import { toast } from "sonner";

export const AllCommands = () => {
  // === track which item is being deleted ===
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // === get all commands ===
  const { isPending, isLoading, isFetching, data } = useQuery({
    queryKey: ["commands"],
    queryFn: getAllCmd,
  });

  // === query client ===
  const queryClient = useQueryClient();

  // === mutation hook ===
  const { mutate } = useMutation({
    mutationFn: deleteCmd,
    onMutate: (id: string) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commands"] });
      toast.success("Command deleted");
      setDeletingId(null);
    },
    onError: (error) => {
      console.error("Failed to delete command:", error);
      toast.error("Failed to delete command");
      setDeletingId(null);
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  // === handle delete cmd ===
  const handleDeleteCommand = (id: string) => {
    mutate(id);
  };

  return (
    <section>
      <div className="border-b p-2">
        <p className="text-sm font-medium text-orange-500">All Commands</p>
      </div>

      {/* table */}
      {data && data?.length !== 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-6 whitespace-normal border-r">
                Index
              </TableHead>
              <TableHead className="w-40 whitespace-normal border-r">
                CMD
              </TableHead>
              <TableHead className="w-60 whitespace-normal border-r">
                Description
              </TableHead>
              <TableHead className="w-6 whitespace-normal text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: ICommand, index: number) => (
              <TableRow key={item._id || index}>
                <TableCell className="w-6 whitespace-normal border-r font-mono">
                  {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                </TableCell>
                <TableCell className="w-40 whitespace-normal border-r font-mono text-primary font-medium">
                  {item?.cmd}
                </TableCell>
                <TableCell className="w-60 whitespace-normal border-r font-mono">
                  {item?.description}
                </TableCell>
                <TableCell className="w-6 whitespace-normal text-center">
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-7 hover:text-destructive"
                    onClick={() => handleDeleteCommand(item?._id as string)}
                    disabled={deletingId === item._id}
                  >
                    {deletingId === item._id ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <Trash />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* pending state */}
      {(isPending || isLoading || isFetching) && (
        <div className="space-y-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-10 w-full bg-secondary" />
          ))}
        </div>
      )}

      {/* empty state */}
      {(!isPending || !isLoading || !isFetching) && data?.length == 0 && (
        <div className="py-2 text-sm font-medium text-center flex items-center justify-center">
          No commands found!
        </div>
      )}
    </section>
  );
};
