import React, { FC } from 'react';

import { useFormik } from 'formik';

import { useAppDispatch } from '../../common/hooks/hooks';
import { addCard } from '../../pages/packsList/cards/cardsReducer';
import { Button } from '../button/Button';
import { Input } from '../input/Input';

import { CustomModal } from './CustomModal';

type FormikErrorType = {
  question?: string;
  answer?: string;
};
type PropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  id?: string;
};

export const AddAndEditCardModal: FC<PropsType> = ({ open, handleClose, title, id }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      question: '',
      answer: '',
    },
    validate: values => {
      const errors: FormikErrorType = {};

      if (!values.question) {
        errors.question = 'Поле обязательно для заполнения';
      }

      return errors;
    },
    onSubmit: values => {
      const data = {
        question: values.question,
        answer: values.answer,
      };

      if (id) dispatch(addCard(id, data.question, data.answer));

      formik.resetForm();
      handleClose();
    },
  });

  return (
    <CustomModal title={title} handleClose={handleClose} open={open}>
      <form className="form form__modal" onSubmit={formik.handleSubmit}>
        <Input
          placeholder="Question"
          {...formik.getFieldProps('question')}
          error={formik.errors.question && formik.touched.question}
          errorText={formik.errors.question}
        />
        <Input
          placeholder="Answer"
          {...formik.getFieldProps('answer')}
          error={formik.errors.answer && formik.touched.answer}
          errorText={formik.errors.answer}
        />
        <div className="submit submit__modals">
          <Button title="Cancel" callBack={handleClose} submit={false} />
          <Button title="Save" submit />
        </div>
      </form>
    </CustomModal>
  );
};
