import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fade } from "@material-ui/core";
import { theme } from "helpers/theme";
import { ROUTES } from "helpers/constants";
import { MainButton } from "components/MainButton/MainButton";
import { UseFormMethods } from "react-hook-form";
import { RegistrationFields } from "./RegistrationFields";

const Container = styled.div`
  width: 100%;
`;

const SubText = styled.div`
  color: ${theme.colors.primary};
  margin-top: 10px;
  a {
    color: ${fade(theme.colors.blue, 0.8)};
    &:hover {
      color: ${theme.colors.blue};
    }
  }
`;

interface Props {
  isValid: boolean;
  mainButtonLoader: boolean;
  register: UseFormMethods["register"];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  emailChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

export const Registration = ({
  emailChange,
  mainButtonLoader,
  isValid,
  onSubmit,
  register,
}: Props) => {
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <RegistrationFields emailChange={emailChange} register={register} />
        <MainButton
          type="submit"
          disabled={!isValid}
          loader={mainButtonLoader ? 1 : 0}
          variant="outlined"
          fullWidth
        >
          Registration
        </MainButton>
        <SubText>
          Do you have an account? <Link to={ROUTES.login}>Sign in here</Link>
        </SubText>
      </form>
    </Container>
  );
};
