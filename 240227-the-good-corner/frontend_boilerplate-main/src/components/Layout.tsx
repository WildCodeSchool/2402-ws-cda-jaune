import Head from "next/head"
import { ReactNode } from "react"
import Header from "./Header"
import styles from "../styles/Layout.module.css";

type Props={
    children: ReactNode
}
export default function Layout({children}: Props){
    return (
    <>
        <Head>
            <title>TGC: The Good Corner</title>
            <meta name="description" content="Awesome LeBonCoin spinoff"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className={styles["main-content"]}>
            {children}
        </main>
    </>
    )
}