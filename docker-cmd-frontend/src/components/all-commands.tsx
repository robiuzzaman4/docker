import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const AllCommands = () => {
  return (
    <section className="space-y-2">
      <p className="text-sm font-medium">All Commands</p>

      {/* table */}
      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 whitespace-normal border-r">Index</TableHead>
              <TableHead className="w-28 whitespace-normal border-r">CMD</TableHead>
              <TableHead className="w-56 whitespace-normal">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-10 whitespace-normal border-r font-mono">01</TableCell>
              <TableCell className="w-28 whitespace-normal border-r font-mono text-primary">Paid</TableCell>
              <TableCell className="w-56 whitespace-normal">Credit Card</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
