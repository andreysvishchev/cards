import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';

import { useAppDispatch } from '../../common/hooks/hooks';
import { ReturnComponentType } from '../../common/types/ReturnComponentsType';
import { setPagination } from '../../pages/cards/cardsReducer';

type PropsType = {
  totalCount: number;
};

const Pagination = (props: PropsType): ReturnComponentType => {
  const { totalCount } = props;
  const dispatch = useAppDispatch();
  const initRowsPerPage = 10;
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initRowsPerPage);

  const handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    value: number,
  ) => void = (event, value) => {
    setPage(value + 1);
    dispatch(setPagination(value + 1, rowsPerPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const newValue = parseInt(event.target.value, 10);

    setRowsPerPage(newValue);
    setPage(1);
    dispatch(setPagination(page, newValue));
  };

  return (
    <div className="pagination">
      <div className="pagination__list">
        <Stack>
          {!!totalCount && (
            <TablePagination
              count={totalCount}
              showFirstButton
              showLastButton
              page={page - 1}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Stack>
      </div>
    </div>
  );
};

export default Pagination;
