import React from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../components/button/Button';
import { AddAndEditPackModal } from '../../../components/modals/AddAndEditPackModal';

export const EmptyPackPage: React.FC<EmptyPackPageType> = ({ packName }) => {
  const navigate = useNavigate();

  const navToPacksList = () => {
    navigate('/packs');
  };

  return (
    <div className="cards">
      <div className="cards__top">
        <div onClick={navToPacksList} className="cards__back">
          <ArrowBackIcon />
          Back to Packs List
        </div>
      </div>
      <div className="cards__title">{packName}</div>
      <div className="empty-pack__flex">
        <div className="empty-pack__text">
          This pack is empty. Click add new pack to fill this pack
        </div>
        <Button
          title="Add new cards"
          callBack={() => {}}
          submit={false}
          disabled={false}
        />
        <AddAndEditPackModal title="Add new cards" open={false} handleClose={() => {}} />
      </div>
    </div>
  );
};

type EmptyPackPageType = {
  packName?: string;
};
