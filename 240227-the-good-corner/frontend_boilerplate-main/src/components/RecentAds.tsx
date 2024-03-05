'use client'
import { useEffect, useState } from "react";
import styles from "../styles/RecentAds.module.css";
import AdCard from "./AdCard";

const ads = [
  {
    title: "Table",
    link: "/ads/table",
    price: 120,
    imgUrl: "/images/table.webp",
  },
  {
    title: "Dame-jeanne",
    link: "/ads/dame-jeanne",
    price: 75,
    imgUrl: "/images/dame-jeanne.webp",
  },
  {
    title: "Vide-poche",
    link: "/ads/vide-poche",
    price: 4,
    imgUrl: "/images/vide-poche.webp",
  },
  {
    title: "Vaisselier",
    link: "/ads/vaisselier",
    price: 900,
    imgUrl: "/images/vaisselier.webp",
  },
  {
    title: "Bougie",
    link: "/ads/bougie",
    price: 8,
    imgUrl: "/images/bougie.webp",
  },
  {
    title: "porte-magazine",
    link: "/ads/porte-magazine",
    price: 45,
    imgUrl: "/images/porte-magazine.webp",
  },
];
export default function RecentAds() {
  const [cart, setCart]=useState(0)
  const [nbRenders, setNbRenders] = useState(0)

  useEffect( ()=>{
    function incrementNbRenders() {
      setNbRenders( (prev)=>{
        const newValue = prev+1
        console.log(newValue);
        return newValue
      } )
      //setNbRenders(nbRenders+1)
    }

    incrementNbRenders()
  }, [] )
  
  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Total: {cart}</p>
      <section className={styles["recent-ads"]}>
        {ads.map((ad) => (
          <div key={ad.title}>
            <AdCard
              imgUrl={ad.imgUrl}
              link={ad.link}
              price={ad.price}
              title={ad.title}
              key={ad.title}
            />
            <button className={styles.button} onClick={()=>setCart(cart+ad.price)}>
              Ajouter au panier
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
