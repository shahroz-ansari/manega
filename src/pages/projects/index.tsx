import Layout from '@/components/layout';
import { getProjectList } from '@/db/store-services/projects';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';

export default function ProjectList() {
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    (async function(){
      const list = await getProjectList()
      console.log(list)
      setProjects(list)
    })()
  }, [])

  return (
    <>
      <header>
        Projects
        <div>
        <Link href="/projects/add">
          <button>Add New</button>
        </Link>
        </div>  
      </header>
      <div>
        {
          projects.map((l:any) => <Link href={`/projects/${l.id}`} key={l.id}>
            <div>{l.name}</div>
          </Link>)
        }
      </div>
    </>
  )
}

ProjectList.getLayout = function getLayout(page: ReactElement) {
  return <Layout showFooter={false}>{page}</Layout>
}