import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdCards from "@/components/AdCards";
import { AdCardProps } from "@/components/AdCard";

export default function AdsPerCategory() {
    const router = useRouter()
  const [ads, setAds] = useState<AdCardProps[]>([])

  async function fetchAds() {
    if(!router.query.id) return
    const {data} = await axios.get<AdCardProps[]>(`http://localhost:5000/ads?category=${router.query.id}`)
    setAds(data)
  }
  useEffect(()=>{fetchAds()}, [router.query.id])

  if(!ads) return <></>;

  return ( 
    <AdCards ads={ads} title={`Annonces de la catégorie n°${router.query.id}`} />
  )
}
