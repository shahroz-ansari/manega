import useAppNavigation from '@/hooks/app-navigation.hook'
import { MuiButton, MuiStack } from '@/mui/components'

const Index = () => {
  const { navigate } = useAppNavigation()
  return (
    <>
      Welcome!!
      <MuiStack>
        <MuiStack direction="row">
          <MuiButton variant="contained" onClick={() => null}>
            Toggle authentication
          </MuiButton>
          <MuiButton variant="contained" onClick={navigate('/')}>
            Goto dashboard
          </MuiButton>
        </MuiStack>
      </MuiStack>
    </>
  )
}

export default Index
