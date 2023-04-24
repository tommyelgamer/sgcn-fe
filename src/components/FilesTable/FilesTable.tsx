import './FilesTable.scss';

import { TableContainer, TableHead, TableBody, Table, Paper } from '@mui/material';

import MemoizedFilesTableCell from './partials/FilesTableCell';
import MemoizedFilesTableRow from './partials/FilesTableRow';

export function FilesTable({
  tableHeaders,
  tableData,
}: {
  tableHeaders: string[];
  tableData: any[][];
}) {
  return (
    <>
      <TableContainer component={Paper} className='files-table__container'>
        <Table aria-label='simple table' className='files-table__table'>
          <TableHead className='files-table__head'>
            {tableHeaders.map((headerRow: string, i: number) => {
              return <MemoizedFilesTableCell cellData={headerRow} key={i} />;
            })}
          </TableHead>
          <TableBody>
            {tableData.map((row, i: number) => {
              return <MemoizedFilesTableRow key={i} rowData={row} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default FilesTable;
