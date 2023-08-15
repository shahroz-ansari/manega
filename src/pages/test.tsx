import useAppNavigation from '@/hooks/app-navigation.hook'
import { MuiButton } from '@/mui/components'

const Test = () => {
  const { navigate } = useAppNavigation()
  return (
    <>
      Welcome!!
      <MuiButton variant="contained" onClick={navigate('/')}>
        Home
      </MuiButton>
    </>
  )
}

export default Test
