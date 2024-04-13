interface Theme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    blue: string;
  };
  backgrounds: {
    login: string;
  };
}
export const theme: Theme = {
  colors: {
    primary: "#F1F1F5",
    secondary: "rgba(247, 247, 250, 0.41)",
    tertiary: "#21223B",
    blue: "#36aeea"
  },
  backgrounds: {
    login: "./images/background.jpg"
  }
};
