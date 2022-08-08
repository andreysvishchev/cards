import React from 'react';

import { Button } from '../../../components/button/Button';

export const EmptyPackPage = () => {
  return (
    <div className="empty-pack">
      <div className="empty-pack__top">
        <div className="empty-pack__title">packName</div>
        <div className="empty-pack__flex">
          <div className="empty-pack__text">
            This pack is empty. Click add new pack to fill this pack
          </div>
          <div className="empty-pack__btn">
            <Button title="Add new pack" submit={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
