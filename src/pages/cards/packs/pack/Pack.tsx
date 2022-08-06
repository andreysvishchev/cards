import React, { memo } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import { IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks';
import { getCards } from '../../cardsReducer';
import { changePackName, deletePack } from '../../packsReducer';

type PropsType = {
  name: string;
  author: string;
  cards: number;
  lastUploaded: string;
  id: string;
  authorId: string;
};

export const Pack = memo((props: PropsType) => {
  const { id, name, cards, authorId, author, lastUploaded } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useAppSelector(state => state.profile._id);
  const disabled = useAppSelector(state => state.app.status);

  const getCardsHandler = () => {
    if (disabled === 'idle') {
      dispatch(getCards(id));
      navigate('/packPage');
    }
  };

  const deletePackHandler = () => {
    if (disabled === 'idle') {
      dispatch(deletePack(id));
    }
  };

  const editPackHandler = () => {
    if (disabled === 'idle') {
      dispatch(changePackName(id, 'nameChanged'));
    }
  };
  const learnAboutPackHandler = () => {};

  return (
    <div className="pack">
      <div onClick={getCardsHandler} className="pack__col">
        {name}
      </div>
      <div className="pack__col">{cards}</div>
      <div className="pack__col">{lastUploaded}</div>
      <div className="pack__col">{author}</div>
      <div className="pack__col pack__col--actions">
        <IconButton
          onClick={deletePackHandler}
          disabled={userId !== authorId}
          className="pack__button pack__button--del"
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={editPackHandler}
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
});
