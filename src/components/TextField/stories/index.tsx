import React from "react";
import { TextField as TextFieldComponent } from "../TextField";
import { withKnobs, boolean } from "@storybook/addon-knobs";

export default {
  title: "TextField",
  decorators: [withKnobs]
};

export const TextField = () => (
  <TextFieldComponent
    variant="outlined"
    label="placeholder"
    disabled={boolean("Disabled", false)}
    error={boolean("Error", false)}
  />
);
