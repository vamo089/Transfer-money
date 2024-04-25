import { ChangeEvent, FormEvent } from "react";
import { UseFormMethods } from "react-hook-form";

export interface RegistrationProps {
  isValid: boolean;
  mainButtonLoader: boolean;
  register: UseFormMethods["register"];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  emailChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

export interface RegistrationFieldsProps {
  register: UseFormMethods["register"];
  emailChange: (value: ChangeEvent<HTMLInputElement>) => void;
}
