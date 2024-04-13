import { DocumentHeadTags, DocumentHeadTagsProps } from "@mui/material-nextjs/v13-pagesRouter";
import { DocumentProps, Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function AppDocument(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html>
      <Head>
        <DocumentHeadTags {...props} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
