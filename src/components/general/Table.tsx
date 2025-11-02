import {
  TableBody,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Checkbox } from "../ui/checkbox";
type Column = {
  id: string;
  label: string;
  isSorted?: boolean;
};

interface TableProp {
  columns: Column[];
  renderData: React.ReactNode;
  selectAll?: boolean;
  selected?: boolean;
  onSelectAllChange?: (checked: boolean) => void;
  selectAllComponent?: React.FC;
}

function Table({
  columns,
  renderData,
  selectAll,
  selected,
  selectAllComponent,
  onSelectAllChange,
}: TableProp) {
  return (
    <TableComponent className="border">
      <TableHeader>
        <TableRow>
          {selectAll && (
            <TableHead className="!px-2 text-center">
              <Checkbox
                defaultChecked={selected}
                onCheckedChange={onSelectAllChange}
              />
            </TableHead>
          )}
          {selectAllComponent && (
            <TableHead className="!px-2 text-center">
              {React.createElement(selectAllComponent)}
            </TableHead>
          )}
          {columns.map((column) => (
            <TableHead key={column.id} className="text-primary text-right">
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
