import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>transfer-money</title>
      </Head>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          height: "calc(100vh - var(--header-height))",
          justifyContent: "center",
          width: "100%"
        }}
      >
        <h1 style={{ textAlign: "left" }}>MY App.</h1>
      </div>
    </>
  );
}
