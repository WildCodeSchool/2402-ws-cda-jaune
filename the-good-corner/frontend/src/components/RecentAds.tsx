import { useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { useGetAllAdsQuery } from "@/generated/graphql-types";

const RecentAds = () => {
  const [total, setTotal] = useState(
    localStorage.getItem("CART_TOTAL")
      ? JSON.parse(localStorage.getItem("CART_TOTAL") as string)
      : 0
  );
  const router = useRouter();

  const { data, error, loading } = useGetAllAdsQuery();
  //const { loading, error, data } = useQuery(GET_ALL_ADS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Cout total: {total} €</p>
      <section className="recent-ads">
        {data!.getAllAds.map((ad) => (
          <div key={ad.id}>
            <AdCard
              imgUrl={ad.imgUrl}
              link={`/ad/${ad.id}`}
              price={ad.price}
              title={ad.title}
            />
            <button
              className="button"
              onClick={() => {
                setTotal(total + ad.price);
                localStorage.setItem(
                  "CART_TOTAL",
                  JSON.stringify(total + ad.price)
                );
              }}
            >
              Ajouter le prix au total
            </button>
            <button className="button">Delete</button>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentAds;
