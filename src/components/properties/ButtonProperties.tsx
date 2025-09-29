import { useQuizStore } from '@/src/store/useQuizStore';
import { ButtonBlock } from '@/src/types';
import { FormControl, InputLabel, TextField } from '@mui/material';
import React, { FC, ChangeEventHandler, FocusEventHandler } from 'react';

interface IButtonPropertiesProps {
  block: ButtonBlock;
}

const defaultFieldLabelMap = {
  previousLabel: 'Previous',
  nextLabel: 'Next',
  submitLabel: 'Submit',
};

type THandleLabelUpdateFn = (
  fieldName: keyof ButtonBlock['properties'],
) => ChangeEventHandler<HTMLInputElement>;
type THandleLabelBlurFn = (
  fieldName: keyof ButtonBlock['properties'],
) => FocusEventHandler<HTMLInputElement>;

const ButtonProperties: FC<IButtonPropertiesProps> = ({ block }) => {
  const { properties, id } = block;
  const { previousLabel, nextLabel, submitLabel } = properties;
  const updateBlock = useQuizStore((s) => s.updateBlock);

  const handleLabelUpdate: THandleLabelUpdateFn = (fieldName) => (e) => {
    const value = e.target.value;

    updateBlock(id, { [fieldName]: value });
  };

  const handleInputBlur: THandleLabelBlurFn = (fieldName) => (e) => {
    const value = e.target.value;
    if (!!value) return;

    updateBlock(id, { [fieldName]: defaultFieldLabelMap[fieldName] });
  };

  return (
    <div>
      <FormControl fullWidth margin="normal" size="small">
        <TextField
          label="Previous Label"
          value={previousLabel ?? ''}
          onChange={handleLabelUpdate('previousLabel')}
          onBlur={handleInputBlur('previousLabel')}
        />
      </FormControl>

      <FormControl fullWidth margin="normal" size="small">
        <TextField
          label="Next Label"
          value={nextLabel ?? ''}
          onChange={handleLabelUpdate('nextLabel')}
          onBlur={handleInputBlur('nextLabel')}
        />
      </FormControl>

      <FormControl fullWidth margin="normal" size="small">
        <TextField
          label="Submit Label"
          value={submitLabel ?? ''}
          onChange={handleLabelUpdate('submitLabel')}
          onBlur={handleInputBlur('submitLabel')}
        />
      </FormControl>
    </div>
  );
};

export default ButtonProperties;
