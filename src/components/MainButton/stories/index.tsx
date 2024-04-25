import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import { MainButton as MainButtonComponent } from "../MainButton";

export default {
  title: "MainButton",
  decorators: [withKnobs]
};

export const MainButton = () => (
  <MainButtonComponent
    disabled={boolean("Disabled", false)}
    loader={boolean("Loader", false)}
    variant="outlined"
    fullWidth
  >
    {text("button name", "button name")}
  </MainButtonComponent>
);
