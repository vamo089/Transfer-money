import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from 'components/TextField/TextField';
import React, { ChangeEvent, useState } from 'react';
import { UseFormMethods } from 'react-hook-form';
import { filterUserList, FilterUserListData } from 'services/filterUserList';
import { setTransferUserData } from 'store/actions/account';
import { useDebouncedCallback } from 'use-debounce';

import { useAppDispatch } from '../store';
import { TransferInitialValues } from './account/Transfer/TransferContainer';

interface Props {
  setValue: UseFormMethods<TransferInitialValues>['setValue'];
  trigger: UseFormMethods<TransferInitialValues>['trigger'];
  register: UseFormMethods<TransferInitialValues>['register'];
}

export const Users = ({ register, trigger, setValue }: Props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<FilterUserListData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const autoCompleteChange = (e: ChangeEvent<{}>, value: FilterUserListData | null) => {
    dispatch(setTransferUserData(value));
    setValue('username', value?.name);
    trigger();
  };

  const inputOnChange = useDebouncedCallback((value: string) => {
    filterUserList(value).then((data) => {
      setOptions(data);
      setLoading(false);
    });
  }, 1000);

  return (
    <Autocomplete
      onChange={autoCompleteChange}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(renderInputParams) => (
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLoading(true);
            inputOnChange(e.target.value);
          }}
          variant="outlined"
          name="username"
          label="User Name"
          inputRef={register}
          fullWidth
          {...renderInputParams}
        />
      )}
    />
  );
};
