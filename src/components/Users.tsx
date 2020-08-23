import React, { ChangeEvent } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { filterUserList } from "services/filterUserList";
import { debounce } from "helpers/debounce";
import { TextField } from "components/TextField/TextField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { UserInfo } from "services/getUserInfo";
import { setTransferUserData } from "store/actions/account";

const getUsersList = debounce((value) => {
  return filterUserList(value).then((data) => data);
}, 1000);

export const Users = (props: any) => {
  const { values, handleChange, setFieldValue } = props;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const transferUserNameData = useSelector<
    RootState,
    Omit<UserInfo, "balance" | "email"> | null
  >((state) => state.account.transferUserData);

  const autocompleteOnChange = (
    value: Omit<UserInfo, "balance" | "email"> | null
  ) => {
    dispatch(setTransferUserData(value));
    setFieldValue("username", value?.name);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    setLoading(true);

    getUsersList(event.target.value).then((data) => {
      setOptions(data);
      setLoading(false);
    });
  };

  return (
    <Autocomplete
      onChange={(
        e: ChangeEvent<{}>,
        value: { id: string; name: string } | null
      ) => autocompleteOnChange(value)}
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
          onBlur={() => setFieldValue("username", transferUserNameData?.name)}
          variant="outlined"
          name="username"
          label="User Name"
          value={values.username}
          fullWidth
          {...renderInputParams}
        />
      )}
    />
  );
};
