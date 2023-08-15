import Link from 'next/link'

import {
  MuiButton,
  MuiDivider,
  MuiStack,
  MuiTypography,
} from '@/mui/components'

const PageHeader = ({
  title,
  link,
  linkText,
  linkVariant = 'contained',
}: {
  title: string
  link?: string
  linkText?: string
  linkVariant?: 'contained' | 'text' | 'outlined'
}) => {
  return (
    <>
      <MuiStack>
        <MuiStack direction="row" justifyContent="space-between">
          <MuiTypography variant="h5">{title}</MuiTypography>
          {link && (
            <Link href={link}>
              <MuiButton variant={linkVariant}>{linkText}</MuiButton>
            </Link>
          )}
        </MuiStack>
      </MuiStack>
      <MuiDivider sx={{ paddingTop: 2, marginBottom: 3 }} />
    </>
  )
}

export default PageHeader
