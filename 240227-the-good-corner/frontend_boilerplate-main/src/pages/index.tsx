import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "./Header";
import RecentAds from "./RecentAds";

export default function Home() {
  return (
    <body>
    <Header />
    <RecentAds />
    
  </body>
  );
}
