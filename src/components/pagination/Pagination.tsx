import React, {useState} from 'react';
import {useAppDispatch} from "../../hooks/hooks";
import {setPagination} from "../../pages/cards/cardsReducer";
import Stack from "@mui/material/Stack";
import TablePagination from "@mui/material/TablePagination";

type PropsType = {
    totalCount: number
}

const Pagination = (props: PropsType) => {
    const dispatch = useAppDispatch();
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);



	const handleChangePage: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		value: number
	) => void = (event, value) => {
		setPage(value +1)
		dispatch(setPagination(value + 1, rowsPerPage))
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newValue = parseInt(event.target.value, 10)
		setRowsPerPage(newValue);
		setPage(1);
		dispatch(setPagination(page,  newValue))
	};

    return (
        <div className="pagination">
            <div className="pagination__list">
				<Stack>
					{!!props.totalCount &&
						<TablePagination
							count={Math.ceil(props.totalCount / rowsPerPage)}
							showFirstButton
							showLastButton
							page={page -1}
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