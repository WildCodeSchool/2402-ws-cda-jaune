import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/AdDetail.module.css";

type Ad = {
  id: number;
  title:string;
  imgUrl: string;
  price: string;
  description: string;
  owner: string
}

export default function AdDetail() {
  const [ad, setAd] = useState<Ad>()
  const router = useRouter();

  async function fetchAd() {
    if(!router.query.id) return;
    const {data} = await axios.get<Ad>(`http://localhost:5000/ads/${router.query.id}`)
    setAd(data)
  }
  useEffect(()=>{fetchAd()}, [router.query.id])

  const hClick = async()=>{
    if(!router.query.id) return;
    await axios.delete(`http://localhost:5000/ads/${router.query.id}`)
    router.push("/")
  }

  if(!ad) return <></>;

  return( 
  <>
    <h2 className={styles["ad-details-title"]}>{ad.title}</h2>
      <section className={styles["ad-details"]}>
        <div className={styles["ad-details-image-container"]}>
          <img className={styles["ad-details-image"]} src={ad.imgUrl} alt={ad.title} />
        </div>
        <div className={styles["ad-details-info"]}>
          <div className={styles["ad-details-price"]}>{ad.price} €</div>
          <div className={styles["ad-details-description"]}>
            {ad.description}
          </div>
          <hr className={styles["separator"]} />
          <div className={styles["ad-details-owner"]}>
            Annoncée publiée par <b>{ad.owner}</b> aujourd&apos;hui (9:32).
          </div>
          <a
            href={`mailto:${ad.owner}`}
            className={`${styles["button"]} ${styles["button-primary"]} ${styles["link-button"]}`}><svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              stroke="currentcolor"
              strokeWidth={2.5}
              fill="none"
            >
              <path
                d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"
              ></path>
            </svg>
            Envoyer un email</a>
        </div>
        <button className={styles.button} onClick={hClick}>Supprimer</button>
      </section>
    </>
  )
}
