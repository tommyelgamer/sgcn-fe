import React from 'react';

import { TableRow } from '@mui/material';

import MemoizedFilesTableCell from './FilesTableCell';

const FilesTableRow = ({ rowData }: { rowData: React.ReactNode[] }) => {
  return (
    <TableRow>
      {rowData.map((data: React.ReactNode, i: number) => {
        return <MemoizedFilesTableCell key={i} cellData={data} />;
      })}
    </TableRow>
  );
};

const MemoizedFilesTableRow = React.memo(FilesTableRow);

export default MemoizedFilesTableRow;
