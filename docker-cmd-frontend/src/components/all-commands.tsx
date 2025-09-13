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
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

export const AllCommands = () => {
  const { isPending, isLoading, isFetching, data } = useQuery({
    queryKey: ["commands"],
    queryFn: getAllCmd,
  });

  return (
    <section>
      <div className="border-b p-2">
        <p className="text-sm font-medium">All Commands</p>
      </div>

      {/* table */}

      {data && data?.length !== 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 whitespace-normal border-r">
                Index
              </TableHead>
              <TableHead className="w-28 whitespace-normal border-r">
                CMD
              </TableHead>
              <TableHead className="w-56 whitespace-normal border-r">
                Description
              </TableHead>
              <TableHead className="w-10 whitespace-normal text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: ICommand, index: number) => (
              <TableRow key={index}>
                <TableCell className="w-10 whitespace-normal border-r font-mono">
                  {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                </TableCell>
                <TableCell className="w-28 whitespace-normal border-r font-mono text-primary">
                  {item?.cmd}
                </TableCell>
                <TableCell className="w-56 whitespace-normal border-r">
                  {item?.description}
                </TableCell>
                <TableCell className="w-10 whitespace-normal text-center">
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-7 hover:text-destructive"
                  >
                    <Trash />
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
    </section>
  );
};
