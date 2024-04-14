import * as React from "react";
import { LoginWidget } from "src/modules/auth/components/Login/LoginWidget";
import { AuthContainer } from "src/modules/auth/components/styles";

export default function Login() {
  return (
    <AuthContainer>
      <LoginWidget />
    </AuthContainer>
  );
}
