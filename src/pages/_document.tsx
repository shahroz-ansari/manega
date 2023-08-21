import Document, { Head, Html, Main, NextScript } from 'next/document'

import { appMeta } from '@/config/meta'

class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={appMeta.locale}>
        <Head>
          <meta charSet="UTF-8" key="charset" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1"
            key="viewport"
          />
          <link rel="manifest" href={`/manifest.json`} />
          <link rel="apple-touch-icon" href={`/icon-192x192.json`} />
          <link rel="icon" href={`/favicon.ico`} key="favicon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
