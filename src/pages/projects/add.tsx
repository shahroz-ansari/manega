import Layout from '@/components/layout'
import { addProject } from '@/db/store-services/projects'
import { ReactElement, useState } from 'react'

export default function ProjectAdd() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const saveProject = async () => {
    if(!name) setError('Enter project name')
    try{
      await addProject({name})
      setSuccess('Saved')
      setName('')
      setTimeout(() => { setSuccess('')}, 3000)
    } catch(error) {
      setError(`Error adding project: ${name}`)
    }
  }

  return (
    <>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
      <div>{error}</div>
      <button onClick={saveProject}>Add</button>
      <div>{success}</div>
    </>
  )
}

ProjectAdd.getLayout = function getLayout(page: ReactElement) {
  return <Layout showFooter={false}>{page}</Layout>
}
