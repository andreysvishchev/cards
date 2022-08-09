import React, { memo, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { AddAndEditPackModal } from '../../components/modals/AddAndEditPackModal';
import { DeletePackAndCard } from '../../components/modals/DeletePackAndCard';

import { getCards } from './cards/cardsReducer';

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

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const closeAddModalHandler = () => {
    setAddModalOpen(false);
  };
  const openAddModalHandler = () => {
    if (disabled === 'idle') {
      setAddModalOpen(true);
    }
  };
  const closeDeleteModalHandler = () => {
    setDeleteModalOpen(false);
  };
  const openDeleteModalHandler = () => {
    if (disabled === 'idle') {
      setDeleteModalOpen(true);
    }
  };

  const getCardsHandler = () => {
    if (disabled === 'idle') {
      // отображение имени колоды
      navigate('/cardsPage', {
        state: {
          packName: name,
          id,
        },
      });
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
      <div className="pack__col">
        <IconButton
          onClick={openDeleteModalHandler}
          disabled={userId !== authorId}
          className="pack__button pack__button--del"
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={openAddModalHandler}
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

      <AddAndEditPackModal
        title="Edit pack"
        id={id}
        handleClose={closeAddModalHandler}
        open={addModalOpen}
      />
      <DeletePackAndCard
        open={deleteModalOpen}
        handleClose={closeDeleteModalHandler}
        title="Delete Pack"
        id={id}
        name={name}
      />
    </div>
  );
});
