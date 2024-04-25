import { MainButton } from "components/MainButton/MainButton";
import { TextField } from "components/TextField/TextField";
import { ROUTES } from "helpers/constants";
import Link from "next/link";
import React from "react";

import * as S from "../styles";
import { ILoginProps } from "./Login.types";

export const Login: React.FC<ILoginProps> = ({ emailChange, mainButtonLoader, isValid, onSubmit, register }) => (
  <S.Container>
    <form onSubmit={onSubmit}>
      <TextField
        autoComplete="userName"
        onChange={emailChange}
        variant="outlined"
        name="email"
        label="Email"
        inputRef={register}
        fullWidth
      />
      <TextField
        autoComplete="current-password"
        variant="outlined"
        name="password"
        label="password"
        type="password"
        inputRef={register}
        fullWidth
      />

      <MainButton type="submit" variant="outlined" disabled={!isValid} loader={mainButtonLoader} fullWidth>
        Login
      </MainButton>

      <div className="Auth_subText">
        Don&apos;t have an account? &nbsp;
        <Link href={ROUTES.registration}>Sign up here</Link>
      </div>
    </form>
  </S.Container>
);
