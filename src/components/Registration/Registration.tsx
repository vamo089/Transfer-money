import React from "react";
import styled from "styled-components";
import { fade } from "@material-ui/core";
import { theme } from "helpers/theme";
import { MainButton } from "components/MainButton/MainButton";
import { Link } from "react-router-dom";
import { Form } from "formik";
import { RegistrationFields } from "./RegistrationFields";
import { ROUTES } from "helpers/constants";
import { FormikHandlers } from "formik/dist/types";
import { RegistrationInitialValues } from "./RegistrationContainer";

export const Container = styled.div`
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

interface RegistrationProps {
  values: RegistrationInitialValues;
  isValid: boolean;
  mainButtonLoader: boolean;
  handleChange: FormikHandlers["handleChange"];
}

export const Registration = ({
  values,
  mainButtonLoader,
  isValid,
  handleChange,
}: RegistrationProps) => {
  return (
    <Container>
      <Form>
        <RegistrationFields values={values} handleChange={handleChange} />
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
      </Form>
    </Container>
  );
};
