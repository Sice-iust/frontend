import Layout from '../src/components/Layout/layout';
import { ThemeProvider } from '../src/components/theme';
import './globals.css';

const MyApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
