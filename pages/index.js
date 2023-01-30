import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"

let socket;
export default function Home() {
    const { data: session } = useSession()

    return (
        <div className={styles.container}>
          <Head>
            <title>Create Next App + Socket IO</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to our website !
            </h1>
              <section>
                  {!session && <div className="mt-4 flex flex-col items-center gap-4">
                      <p className="text-lg">Not signed in as admin</p>
                      <button type="button" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => signIn()}>Sign in</button>
                  </div>}
                  {session && <div>
                      <p>Signed in as {session.user.email}</p>
                      <button type="button" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={()=> signOut()}>Sign out</button>
                  </div>}
              </section>
          </main>
    </div>
    )
}
