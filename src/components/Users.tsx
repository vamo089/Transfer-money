import React, { ChangeEvent } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { filterUserList } from "services/filterUserList";
import { debounce } from "helpers/debounce";
import { createState } from "helpers/createState";
import { TextField } from "components/TextField";

const getUsersList = debounce((value) => {
  return filterUserList(value).then((data) => data);
}, 1000);

export const transferUserName = createState<{
  id: string;
  name: string;
} | null>(null);

export const Users = (props: any) => {
  const { values, handleChange, setFieldValue } = props;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const transferUserNameData = transferUserName.get()?.name;

  const autocompleteOnChange = (value: { id: string; name: string } | null) => {
    transferUserName.set(value);
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
          onBlur={() => setFieldValue("username", transferUserNameData)}
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
