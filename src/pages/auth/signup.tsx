import * as React from "react";
import { RegistrationWidget } from "src/modules/auth/components/Registration/RegistrationWidget";
import { AuthContainer } from "src/modules/auth/components/styles";

export default function Signup() {
  return (
    <AuthContainer>
      <RegistrationWidget />
    </AuthContainer>
  );
}
