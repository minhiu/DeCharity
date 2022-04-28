import Head from "next/head";
import "../styles/globals.scss";
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";

const Application = ({ Component, pageProps }) => {
  const router = useRouter(),
    [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));

    return () => {
      router.events.off("routeChangeStart", async () => setLoading(false));
      router.events.off("routeChangeComplete", async () => setLoading(false));
    };
  }, [router.events]);

  return (
    <>
      {loading ? (
        <div className="loader-wrapper">
          <ClipLoader loading={loading} color={"#035397"} size={150} />
        </div>
      ) : (
        <React.Fragment>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
            />
            <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
              crossOrigin="anonymous"
            />
          </Head>
          <Component {...pageProps} />
        </React.Fragment>
      )}
    </>
  );
};

export default Application;
