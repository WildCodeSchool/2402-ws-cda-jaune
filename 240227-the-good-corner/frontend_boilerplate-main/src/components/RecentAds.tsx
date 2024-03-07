import { useEffect, useState } from "react";
import styles from "../styles/RecentAds.module.css";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";
import AdCards from "./AdCards";

export default function RecentAds() {
  const [ads, setAds] = useState<AdCardProps[]>([]);

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
    <AdCards title="Annonces récentes" ads={ads} />
  );
}
