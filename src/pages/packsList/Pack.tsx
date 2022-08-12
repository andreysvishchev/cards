import React, { memo, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../common/hooks/hooks';
import { AddAndEditPackModal } from '../../components/modals/AddAndEditPackModal';
import { DeletePackAndCard } from '../../components/modals/DeletePackAndCard';

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
  const updatedDate = new Date(lastUploaded).toLocaleDateString('ru');

  const navigate = useNavigate();

  const userId = useAppSelector(state => state.profile._id);
  const status = useAppSelector(state => state.app.status);

  // Name length control
  const maxNameLength = 30;
  const nameRedacted =
    name.length > maxNameLength ? `${name.slice(0, maxNameLength)}...` : name;

  // Modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const closeEditModalHandler = () => setEditModalOpen(false);
  const openEditModalHandler = () => setEditModalOpen(true);

  const closeDeleteModalHandler = () => setDeleteModalOpen(false);
  const openDeleteModalHandler = () => setDeleteModalOpen(true);

  // Navigate
  const getCardsHandler = () => {
    if (status === 'idle') {
      // отображение имени колоды
      navigate('/cardsPage', {
        state: {
          packName: nameRedacted,
          id,
        },
      });
    }
  };

  const learnAboutPackHandler = () => {
    navigate(`/learnPage/${id}`, {
      state: {
        packName: name,
      },
    });
  };

  return (
    <div className="pack">
      <div onClick={getCardsHandler} className="pack__col">
        {nameRedacted}
      </div>
      <div className="pack__col">{cards}</div>
      <div className="pack__col">{updatedDate}</div>
      <div className="pack__col">{author}</div>
      <div className="pack__col">
        <IconButton
          onClick={learnAboutPackHandler}
          className="pack__button pack__button--teach"
          aria-label="learn"
          size="small"
          disabled={status === 'loading'}
        >
          <SchoolIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={openEditModalHandler}
          className="pack__button pack__button--edit"
          disabled={userId !== authorId || status === 'loading'}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={openDeleteModalHandler}
          disabled={userId !== authorId || status === 'loading'}
          className="pack__button pack__button--del"
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>

      <Stack direction="row" className="pack__col pack__col--actions" />

      <AddAndEditPackModal
        title="Edit pack"
        id={id}
        handleClose={closeEditModalHandler}
        open={editModalOpen}
      />
      <DeletePackAndCard
        open={deleteModalOpen}
        handleClose={closeDeleteModalHandler}
        title="Delete Pack"
        packId={id}
        name={nameRedacted}
      />
    </div>
  );
});