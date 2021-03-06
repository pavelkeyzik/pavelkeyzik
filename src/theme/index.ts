type Theme = typeof lightTheme;

const colorTokens = {
  white: '#fff',
  black: '#000',
  gray: {
    100: '#e6e6e6',
    200: '#cccccc',
    300: '#b3b3b3',
    400: '#999999',
    500: '#808080',
    600: '#666666',
    700: '#4d4d4d',
    800: '#333333',
    900: '#1a1a1a',
  },
};

const lightTheme = {
  color: {
    primary: colorTokens.black,
    background: colorTokens.gray[100],
    textForeground: colorTokens.gray[700],
    headingsForeground: colorTokens.black,
    headerBackground: 'transparent',
    link: colorTokens.gray[800],
    linkHover: colorTokens.black,
    profilePreviewShape1: '#0468ff',
    profilePreviewShape2: '#ff1e3d',
    profilePreviewShape3: '#ffae38',
    profilePreviewShape4: '#00d57e',
    footerTextForeground: colorTokens.gray[400],
    technologiesListColor: colorTokens.gray[900],
    inputLabel: colorTokens.black,
    inputBackground: colorTokens.white,
    inputForeground: colorTokens.black,
    inputBorder: colorTokens.white,
    inputBorderFocus: colorTokens.black,
    buttonBackground: colorTokens.black,
    buttonForeground: colorTokens.white,
    buttonBackgroundDisabled: colorTokens.gray[200],
    buttonForegroundDisabled: colorTokens.gray[400],
    errorMessage: '#b30000',
    successMessage: '#148514',
  },
};

const darkTheme = {
  color: {
    primary: colorTokens.white,
    background: colorTokens.gray[900],
    textForeground: colorTokens.gray[300],
    headingsForeground: colorTokens.white,
    headerBackground: 'transparent',
    link: colorTokens.gray[200],
    linkHover: colorTokens.white,
    profilePreviewShape1: '#83b5ff',
    profilePreviewShape2: '#ff9dab',
    profilePreviewShape3: '#ffcd83',
    profilePreviewShape4: '#d0ffec',
    footerTextForeground: colorTokens.gray[600],
    technologiesListColor: '#ffcd83',
    inputLabel: colorTokens.white,
    inputBackground: colorTokens.gray[800],
    inputForeground: colorTokens.white,
    inputBorder: colorTokens.gray[800],
    inputBorderFocus: colorTokens.gray[500],
    buttonBackground: colorTokens.white,
    buttonForeground: colorTokens.black,
    buttonBackgroundDisabled: colorTokens.gray[800],
    buttonForegroundDisabled: colorTokens.gray[400],
    errorMessage: '#ff4d4d',
    successMessage: '#90ee90',
  },
};

const theme = {
  lightTheme,
  darkTheme,
};

export type { Theme };
export { theme };
