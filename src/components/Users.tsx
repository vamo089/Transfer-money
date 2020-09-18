import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { filterUserList, FilterUserListData } from "services/filterUserList";
import { debounce } from "helpers/debounce";
import { TextField } from "components/TextField/TextField";
import { setTransferUserData } from "store/actions/account";

interface Props {
  register: any;
}

const getUsersList = debounce((value) => {
  return filterUserList(value).then((data) => data);
}, 1000);

export const Users = ({ register }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    getUsersList(event.target.value).then((data) => {
      setOptions(data);
      setLoading(false);
    });
  };

  return (
    <Autocomplete
      onChange={(e: ChangeEvent<{}>, value: FilterUserListData | null) =>
        dispatch(setTransferUserData(value))
      }
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(renderInputParams) => (
        <TextField
          onChange={onChange}
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
