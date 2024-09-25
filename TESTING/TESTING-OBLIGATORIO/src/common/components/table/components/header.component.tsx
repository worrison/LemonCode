import React from 'react';
import { HeaderGroup } from 'react-table';
import { TableHead, TableRow } from '@mui/material';
import { CellComponent } from './cell.component';

interface Props {
  headerGroups: HeaderGroup[];
}

export const HeaderComponent: React.FunctionComponent<Props> = (props) => {
  const { headerGroups } = props;
  return (
    <TableHead>
      {headerGroups.map((headerGroup, headerGroupIndex) => (
        <TableRow
          {...headerGroup.getHeaderGroupProps()}
          key={headerGroup.id || `headerGroup-${headerGroupIndex}` /* Fallback al índice si no hay id */}
        >
          {headerGroup.headers.map((column, columnIndex) => (
            <CellComponent
              {...column.getHeaderProps()}
              key={column.id || `column-${columnIndex}` /* Fallback al índice si no hay id */}
            >
              {column.render('Header')}
            </CellComponent>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
};
