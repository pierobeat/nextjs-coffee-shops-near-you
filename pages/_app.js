import '../styles/globals.css'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import StoreProvider from "../store/store-context";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Hollaaa</title>
      </Head>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>  {" "}
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default MyApp
