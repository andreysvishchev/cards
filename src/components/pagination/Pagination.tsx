import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../../hooks/hooks";
import {pageChanged} from "../../pages/cards/cardsReducer";
import Stack from "@mui/material/Stack";
import TablePagination from "@mui/material/TablePagination";

type PropsType = {
    totalCount: number
}

const Pagination = (props: PropsType) => {
    const dispatch = useAppDispatch();
	const [page, setPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(10)


	useEffect(()=> {
		dispatch(pageChanged(page + 1, rowsPerPage))
	}, [page, rowsPerPage])

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

    return (
        <div className="pagination">
            <div className="pagination__list">
				<Stack>
					{!!props.totalCount &&
						<TablePagination
							count={props.totalCount}
							showFirstButton
							showLastButton
							page={page}
							onPageChange={handleChangePage}
							rowsPerPage={rowsPerPage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>}
				</Stack>
            </div>
        </div>
    );
};

export default Pagination;