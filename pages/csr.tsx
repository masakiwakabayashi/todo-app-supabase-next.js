import { useRouter } from "next/router"
import { NextPage } from "next"
import { Layout } from "../components/Layout"
import { supabase } from "../utils/supabese"
import { Task, Notice } from "../types/types"
import { useEffect, useState } from "react"

const Csr: NextPage = () => {
  // <Task[]>が型、初期値が空の配列なので([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [notices, setNotices] = useState<Notice[]>([])

  useEffect(()=>{
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: true })
        setTasks(tasks as Task[])
    }
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: true })
        setNotices(notices as Notice[])
    }
    getTasks()
    getNotices()
  },[])

  return (
    <Layout title="CSR">
      <p className="mb-3 text-blue-500">SSG + CSF</p>
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
    </Layout>
  );
}

export default Csr;
