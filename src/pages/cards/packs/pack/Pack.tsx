import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import { IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks';
import { changePackName, deletePack, fetchCards } from '../../cardsReducer';

type PropsType = {
  name: string;
  author: string;
  cards: number;
  lastUploaded: string;
  id: string;
  authorId: string;
};

const Pack = (props: PropsType) => {
  const { id, name, cards, authorId, author, lastUploaded } = props;
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.login.id);

  const test = () => {
    dispatch(fetchCards(id));
  };

  const DeletePackHandler = () => {
    dispatch(deletePack(id));
  };

  const EditPackHandler = () => {
    dispatch(changePackName(id, 'nameChanged'));
  };
  const learnAboutPackHandler = () => {};

  return (
    <div className="pack">
      <div className="pack__col" onClick={test}>
        {name}
      </div>
      <div className="pack__col">{cards}</div>
      <div className="pack__col">{lastUploaded}</div>
      <div className="pack__col">{author}</div>
      <div className="pack__col pack__col--actions">
        <IconButton
          onClick={DeletePackHandler}
          disabled={userId !== authorId}
          className="pack__button pack__button--del"
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={EditPackHandler}
          className="pack__button pack__button--edit"
          disabled={userId !== authorId}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={learnAboutPackHandler}
          className="pack__button pack__button--teach"
          aria-label="learn"
          size="small"
        >
          <SchoolIcon fontSize="inherit" />
        </IconButton>
      </div>

      <Stack direction="row" className="pack__col pack__col--actions" />
    </div>
  );
};

export default Pack;
