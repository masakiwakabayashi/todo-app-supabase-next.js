import Link from "next/link"
import { useRouter } from "next/router"
import { NextPage } from "next"
import { GetStaticProps } from "next"
import { Layout } from "../components/Layout"
import { supabase } from "../utils/supabese"
import { Task, Notice } from "../types/types"


export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/ssg invoked');
  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    // 新しいものが下にくるように
    .order('created_at', { ascending: true })
  return { props: { tasks, notices } }
}

type StaticProps = {
  // 配列の型を定義する
  tasks: Task[]
  notices: Notice[]
}

const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
  const router = useRouter()

  return (
    <Layout title="SSG">
      <p className="mb-3 text-blue-500">ssg</p>
      <ul className="mb-3">
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className="text-lg front-extrabold">{task.title}</p>
            </li>
          )
        })}
      </ul>
      <ul className="mb-3">
        {notices.map((notice)=>{
          return (
            <li key={notice.id}>
              <p className="text-lg fonr-extrabold">{notice.content}</p>
            </li>
          )
        })}
      </ul>
      <Link href="/ssr" prefetch={false} className="my-3 text-xs">
        Link to ssr
      </Link>
      <button className="mb-3 text-xs" onClick={()=>{ router.push('/ssr') }}>
        Route to ssr
      </button>
    </Layout>
  )
}

export default Ssg



