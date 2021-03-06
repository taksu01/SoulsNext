import Layout from "../Application/sunfish/components/layout/Layout";
import "../styles/globals.css";
import "./i18n";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
