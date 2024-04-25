import { ChangeEvent, FormEvent } from "react";
import { UseFormMethods } from "react-hook-form";

export interface ILoginProps {
  isValid: boolean;
  mainButtonLoader: boolean;
  register: UseFormMethods["register"];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  emailChange: (value: ChangeEvent<HTMLInputElement>) => void;
}
