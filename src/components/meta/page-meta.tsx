import { NextSeo } from 'next-seo'

import { appMeta } from '@/config/meta'

type IMetaProps = {
  title: string
  description: string
  canonical?: string
}

const Meta = (props: IMetaProps) => {
  return (
    <>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: appMeta.locale,
          site_name: appMeta.site_name,
        }}
      />
    </>
  )
}

export { Meta }
