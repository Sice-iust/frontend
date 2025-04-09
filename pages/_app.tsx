import { ThemeProvider } from '../src/components/theme';

const MyApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
