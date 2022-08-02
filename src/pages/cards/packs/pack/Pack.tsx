import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {changePackName, deletePack, fetchCards} from "../../cardsReducer";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import Stack from "@mui/material/Stack";

type PropsType = {
    name: string
    author: string
    cards: number
    lastUploaded: string
    id: string,
	authorId: string
}


const Pack = (props: PropsType) => {
    const dispatch = useAppDispatch();
	const userId = useAppSelector(state => state.login.id);

    const test = () => {
        dispatch(fetchCards(props.id))
    }

	const DeletePackHandler = () => {
		dispatch(deletePack(props.id))
	}

	const EditPackHandler = () => {
		dispatch(changePackName(props.id, 'nameChanged'))
	}
	const learnAboutPackHandler = () => {

	}

    return (
        <div className='pack'>
            <div className="pack__col" onClick={test}>{props.name}</div>
            <div className="pack__col">{props.cards}</div>
            <div className="pack__col">{props.lastUploaded}</div>
            <div className="pack__col">{props.author}</div>
			<div className="pack__col pack__col--actions">
				<IconButton onClick={DeletePackHandler}
							disabled={userId !== props.authorId}
							className="pack__button pack__button--del"
							aria-label="delete"
							size='small' >
					<DeleteIcon fontSize='inherit'  />
				</IconButton>
				<IconButton onClick={EditPackHandler}
							className="pack__button pack__button--edit"
							disabled={userId !== props.authorId}
							aria-label="edit"
							size='small'>
					<EditIcon fontSize='inherit'/>
				</IconButton>
				<IconButton onClick={learnAboutPackHandler}
							className="pack__button pack__button--teach"
							aria-label="learn"
							size='small'>
					<SchoolIcon fontSize='inherit' />
				</IconButton>
			</div>

				<Stack direction="row" className="pack__col pack__col--actions" >

				</Stack>
        </div>
    );
};

export default Pack;