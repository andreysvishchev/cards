import React, { FC, useEffect } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';

import { useAppDispatch } from '../../common/hooks/hooks';
import { addPack, changePackName } from '../../pages/packsList/packsReducer';
import { Button } from '../button/Button';
import { Input } from '../input/Input';

import { CustomModal } from './CustomModal';

type FormikErrorType = {
  packName?: string;
  privatePack?: boolean;
};
type PropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  id?: string;
};

export const AddAndEditPackModal: FC<PropsType> = ({ open, handleClose, title, id }) => {
  const dispatch = useAppDispatch();

  // reset form after close
  useEffect(() => {
    formik.resetForm();
  }, [open]);

  const cancelHandler = () => {
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      packName: '',
      privatePack: false,
    },
    validate: values => {
      const errors: FormikErrorType = {};
      const maxNameLength = 70;

      if (!values.packName) {
        errors.packName = 'Поле обязательно для заполнения';
      }
      if (values.packName.length > maxNameLength) {
        errors.packName = 'Превышена максимальная длина';
      }

      return errors;
    },
    onSubmit: values => {
      const data = {
        packName: values.packName,
        privatePack: values.privatePack,
      };

      if (id) dispatch(changePackName(id, data.packName, data.privatePack));
      else dispatch(addPack(data.packName, data.privatePack));

      formik.resetForm();
      handleClose();
    },
  });

  return (
    <CustomModal title={title} handleClose={handleClose} open={open}>
      <form className="form form__modal" onSubmit={formik.handleSubmit}>
        <Input
          placeholder="Pack name"
          {...formik.getFieldProps('packName')}
          error={formik.errors.packName && formik.touched.packName}
          errorText={formik.errors.packName}
        />
        <FormControlLabel
          label="Private pack"
          control={
            <Checkbox
              checked={formik.values.privatePack}
              {...formik.getFieldProps('privatePack')}
            />
          }
        />
        <div className="submit submit__modals">
          <Button title="Cancel" callBack={cancelHandler} submit={false} />
          <Button title="Save" submit />
        </div>
      </form>
    </CustomModal>
  );
};
