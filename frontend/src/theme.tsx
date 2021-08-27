import { extendTheme, Theme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = {
  body: `Roboto,Arial,Helvetica,sans-serif`,
  heading: `'Open Sans',Roboto,Arial,Helvetica,sans-serif`,
  mono: `'Open Sans',Arial,Helvetica,sans-serif`
};

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em'
});

const theme: Theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  colors: {
    black: '#16161D'
  },
  fonts,
  breakpoints
});

export default theme;
