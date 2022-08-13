import React, { FC } from 'react';

import { useAppDispatch } from '../../common/hooks/hooks';
import { deleteCard } from '../../pages/packsList/cards/cardsReducer';
import { deletePack } from '../../pages/packsList/packsReducer';
import { Button } from '../button/Button';

import { CustomModal } from './CustomModal';

type PropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  packId: string;
  name: string;
  cardId?: string;
};

export const DeletePackAndCard: FC<PropsType> = ({
  open,
  handleClose,
  title,
  cardId,
  name,
  packId,
}) => {
  const dispatch = useAppDispatch();

  const deletePackHandler = () => {
    if (cardId) dispatch(deleteCard(packId, cardId));
    else dispatch(deletePack(packId));

    handleClose();
  };

  return (
    <CustomModal title={title} handleClose={handleClose} open={open}>
      <div className="modals modals__deleteMessage">
        <p className="cut">
          Do you really want to remove <b>{name}</b>? All cards will be deleted.
        </p>
        <div className="submit submit__modals">
          <Button title="Cancel" callBack={handleClose} submit={false} />
          <Button title="Delete" callBack={deletePackHandler} submit={false} />
        </div>
      </div>
    </CustomModal>
  );
};
