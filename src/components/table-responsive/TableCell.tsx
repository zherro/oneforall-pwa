import { CSSProperties } from "react";

interface TableCellProps {
  children: any;
  title?: string;
  styles?: CSSProperties;
}

const TableCell = ({ children, title, styles }: TableCellProps) => {
  return (
    <div className="cell" data-title={title} style={styles}>
      {children}
    </div>
  );
};

export default TableCell;
