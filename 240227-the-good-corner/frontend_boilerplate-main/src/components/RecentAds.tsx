import { useEffect, useState } from "react";
import styles from "../styles/RecentAds.module.css";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";
import { useRouter } from "next/router";

export default function RecentAds() {
  const [cart, setCart] = useState(0);
  const [ads, setAds] = useState<AdCardProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const { data } = await axios.get<AdCardProps[]>(
          "http://localhost:5000/ads",
        );
        setAds(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAds();
  }, []);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Total: {cart}</p>
      <section className={styles["recent-ads"]}>
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              imgUrl={ad.imgUrl}
              link={ad.link}
              price={ad.price}
              title={ad.title}
              key={ad.title}
            />
            <button
              className={styles.button}
              onClick={() => setCart(cart + ad.price)}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
