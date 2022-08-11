import React, { FC, useEffect } from 'react';

import { useFormik } from 'formik';

import { useAppDispatch } from '../../common/hooks/hooks';
import { addCard, changeCardName } from '../../pages/packsList/cards/cardsReducer';
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
  packId: string;
  cardId?: string;
};

export const AddAndEditCardModal: FC<PropsType> = ({
  open,
  handleClose,
  title,
  packId,
  cardId,
}) => {
  const dispatch = useAppDispatch();

  // reset form after close
  useEffect(() => {
    formik.resetForm();
  }, [open]);

  const formik = useFormik({
    initialValues: {
      question: '',
      answer: '',
    },
    validate: values => {
      const errors: FormikErrorType = {};
      const maxQuestionLength = 70;

      if (!values.question) {
        errors.question = 'Поле обязательно для заполнения';
      }
      if (values.question.length > maxQuestionLength) {
        errors.question = 'Превышена максимальная длина';
      }

      return errors;
    },
    onSubmit: values => {
      const data = {
        question: values.question,
        answer: values.answer,
      };

      if (cardId) dispatch(changeCardName(packId, cardId, data.question, data.answer));
      else dispatch(addCard(packId, data.question, data.answer));

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
