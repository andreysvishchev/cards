import React, { ChangeEvent, useState } from 'react';

const Checkbox = () => {
  const [value, setValue] = useState(false);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.checked);
  };

  return (
    <label htmlFor="checkbox" className="checkbox">
      <span
        className={value ? 'checkbox__icon checkbox__icon--active' : 'checkbox__icon'}
      />
      <input
        onChange={onChangeHandler}
        className="checkbox__input"
        type="checkbox"
        checked={value}
      />
    </label>
  );
};

export default Checkbox;
