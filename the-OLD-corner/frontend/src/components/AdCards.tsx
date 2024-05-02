import { useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import styles from "../styles/AdCards.module.css";

type Props = {
  title: string;
  ads: AdCardProps[];
};
export default function AdCards({ title, ads }: Props) {
  const [cart, setCart] = useState(0);

  return (
    <>
      <h2>{title}</h2>
      <p>Total: {cart}</p>
      <section className={styles["recent-ads"]}>
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              imgUrl={ad.imgUrl}
              link={`/ads/${ad.id}`}
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
