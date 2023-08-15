import type { EmotionCache } from '@emotion/react'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import createEmotionCache from '@/mui/emotion-cache'
import { themeLight } from '@/mui/theme'
import { store } from '@/store'
import AppDefaultTemplate from '@/templates/default'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}

export default function MyApp(properties: AppPropsWithLayout) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = properties
  const getLayout =
    Component.getLayout ??
    ((page) => <AppDefaultTemplate>{page}</AppDefaultTemplate>)

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={createTheme(themeLight)}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}
