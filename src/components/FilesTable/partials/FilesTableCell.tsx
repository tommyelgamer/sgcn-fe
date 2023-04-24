import React from 'react';

import { TableCell } from '@mui/material';

const FilesTableCell = ({ cellData }: { cellData: React.ReactNode }) => {
  return (
    <TableCell className='files-table__head__cell' sx={{ fontWeight: 'bold' }}>
      {cellData}
    </TableCell>
  );
};

const MemoizedFilesTableCell = React.memo(FilesTableCell);

export default MemoizedFilesTableCell;
