import React from 'react';

import { ReturnComponentType } from '../../common/types/ReturnComponentsType';
import Button from '../../components/button/Button';

const Test = (): ReturnComponentType => {
  return (
    <div>
      <Button title="Кнопка" submit={false} />
    </div>
  );
};

export default Test;
