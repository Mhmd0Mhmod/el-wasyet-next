import {
  TableBody,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type Column = {
  id: string;
  label: string;
  isSorted?: boolean;
};

interface TableProp {
  columns: Column[];
  renderData: React.ReactNode;
}

function Table({ columns, renderData }: TableProp) {
  return (
    <TableComponent className="border">
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.id} className="text-right">
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{renderData}</TableBody>
    </TableComponent>
  );
}
export default Table;
