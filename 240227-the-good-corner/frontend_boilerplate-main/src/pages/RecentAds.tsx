import styles from "../styles/RecentAds.module.css";
import AdCard from "./AdCard";

export default function RecentAds() {
  const ads = [
    {
      title: "/ads/table",
      link: "Table",
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
  return (
    <main className={styles["main-content"]}>
      <h2>Annonces récentes</h2>
      <section className={styles["recent-ads"]}>
        {ads.map((ad) => (
          <AdCard
            imgUrl={ad.imgUrl}
            link={ad.link}
            price={ad.price}
            title={ad.title}
            key={ad.title}
          />
        ))}
      </section>
    </main>
  );
}
