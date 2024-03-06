import styles from "../styles/AdCard.module.css";

export type AdCardProps = {
  id?: number;
  title: string;
  imgUrl: string;
  price: number;
  link: string;
};
export default function AdCard({
  title,
  imgUrl,
  price,
  link,
}: Omit<AdCardProps, "id">) {
  return (
    <div className={styles["ad-card-container"]}>
      <a className={styles["ad-card-link"]} href={`/ads/1`}>
        <img className={styles["ad-card-image"]} src={imgUrl} />
        <div className={styles["ad-card-text"]}>
          <div className={styles["ad-card-title"]}>{title}</div>
          <div className={styles["ad-card-price"]}>{price} €</div>
        </div>
      </a>
    </div>
  );
}
