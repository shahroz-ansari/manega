import type { ReactElement } from 'react'

import Layout from '@/components/layout'
import styles from '@/styles/App.module.css'

export default function Home() {
  return (
    <>
      Dashboard
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout showFooter={false}>{page}</Layout>
}
