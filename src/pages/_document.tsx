import Document, { Head, Html, Main, NextScript } from 'next/document'

import { appMeta } from '@/config/meta'

class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={appMeta.locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
