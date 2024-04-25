import { MainButton } from "components/MainButton/MainButton";
import { ROUTES } from "helpers/constants";
import Link from "next/link";
import React from "react";
import { RegistrationProps } from "src/modules/auth/components/Registration/Registration.types";

import * as S from "../styles";
import { RegistrationFields } from "./RegistrationFields";

export const Registration: React.FC<RegistrationProps> = ({
  emailChange,
  mainButtonLoader,
  isValid,
  onSubmit,
  register
}) => (
  <S.Container>
    <form onSubmit={onSubmit}>
      <RegistrationFields emailChange={emailChange} register={register} />
      <MainButton type="submit" disabled={!isValid} loader={mainButtonLoader ? 1 : 0} variant="outlined" fullWidth>
        Registration
      </MainButton>
      <div className="Auth_subText">
        Do you have an account? &nbsp;
        <Link href={ROUTES.login}>Sign in here</Link>
      </div>
    </form>
  </S.Container>
);
