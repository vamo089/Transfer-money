import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { object, string, number } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useSnackbar } from "notistack";
import { logout } from "helpers/logout";
import { getUserInfo } from "services/getUserInfo";
import { createTransaction } from "services/createTransaction";
import { getListOfTransactions } from "services/getListOfTransactions";
import { setPreviousTransactionData, setUserData } from "store/actions/account";
import { Transfer } from "./Transfer";


export interface TransferInitialValues {
  username: string;
  sum: number;
}

const currentUserBalance = () => {
  return getUserInfo()
    .then((user_info_token) => user_info_token.balance)
    .catch(({ response }) => response.data === "UnauthorizedError" && logout());
};

export const TransferContainer = () => {
  const [mainButtonLoader, setMainButtonLoader] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm<TransferInitialValues>({
    resolver: yupResolver(
      object({
        username: string().required(),
        sum: number().positive().required(),
      })
    ),
    mode: "all",
    defaultValues: {
      username: "",
      sum: 0,
    },
  });

  const onSubmit = (values: TransferInitialValues) => {
    const { username, sum } = values;
    setMainButtonLoader(true);
    let balance = currentUserBalance().then((data) => data);

    balance.then((balance) => {
      if (sum <= balance) {
        createTransaction(username, sum.toString()).then(({ trans_token }) => {
          enqueueSnackbar(`You sent ${sum} to ${username}`, {
            variant: "info",
          });

          setValue("sum", 0, { shouldValidate: true });

          dispatch(setUserData({ ...trans_token }));
          getListOfTransactions().then((data) =>
            dispatch(setPreviousTransactionData(data))
          );
        });
      } else {
        enqueueSnackbar("Sorry you have insufficient funds available", {
          variant: "error",
        });
      }
      setMainButtonLoader(false);
    });
  };

  return (
    <Transfer
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      getValues={getValues()}
      mainButtonLoader={mainButtonLoader}
      isValid={isValid}
    />
  );
};
