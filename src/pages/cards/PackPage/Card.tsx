import React from 'react';

import Stack from '@mui/material/Stack';

const Card: React.FC<CardPropsType> = props => {
  const { answer, grade, lastUpdated, question } = props;

  return (
    <div className="pack">
      <div className="pack__col">{question}</div>
      <div className="pack__col">{answer}</div>
      <div className="pack__col">{lastUpdated}</div>
      <div className="pack__col">{grade}</div>
      <div className="pack__col pack__col--actions" />
      <Stack direction="row" className="pack__col pack__col--actions" />
    </div>
  );
};

export default Card;

type CardPropsType = {
  question: string;
  answer: string;
  lastUpdated: string;
  grade: number;
};
