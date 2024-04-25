import { GlobalStyles } from "@mui/material";
import { DocumentHeadTags, DocumentHeadTagsProps } from "@mui/material-nextjs/v13-pagesRouter";
import { DocumentProps, Head, Html, Main, NextScript } from "next/document";
import React from "react";

import { globalStyles } from "~shared/ui/globalStyles";

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
        <GlobalStyles styles={globalStyles} />
      </body>
    </Html>
  );
}
