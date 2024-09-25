import React from 'react';
import { Row } from 'react-table';
import { TableBody } from '@mui/material';
import { RowRendererProps } from '../table.vm';

interface Props<T extends object = {}> {
  rows: Row<T>[];
  prepareRow: (row: Row<T>) => void;
  rowRenderer: (props: RowRendererProps<T>) => React.ReactNode;
}

export const BodyComponent: React.FunctionComponent<Props> = (props) => {
  const { rows, prepareRow, rowRenderer } = props;
  return (
    <TableBody>
    {rows.map((row, index) => {
      prepareRow(row);
      return (
        <React.Fragment key={row.id || row.original.id || index}> {/* Usa una clave única */}
          {rowRenderer({
            ...row.getRowProps(),
            row: row.original,
          })}
        </React.Fragment>
      );
    })}
  </TableBody>
  );
};
