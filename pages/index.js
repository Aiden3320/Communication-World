import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'

import Layout from './components/layout';
import { useSession } from "next-auth/react"
export default function Home() {
  const { data: session } = useSession()
  console.log(session);

  return (
    <Layout>
      This is Test
    </Layout>
  )
}
