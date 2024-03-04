import AdCard from "./AdCard";

export default function RecentAds() {
    return (
<main className="main-content">
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
      <AdCard imgUrl="/images/table.webp" link="/ads/table" price={120} title="Table" />
      <AdCard imgUrl="/images/dame-jeanne.webp" link="/ads/dame-jeanne" price={75} title="Dame-jeanne" />
      <AdCard imgUrl="/images/vide-poche.webp" link="/ads/vide-poche" price={4} title="Vide-poche" />
      <AdCard imgUrl="/images/vaisselier.webp" link="/ads/vaisselier" price={900} title="Vaisselier" />
      <AdCard imgUrl="/images/bougie.webp" link="/ads/bougie" price={8} title="Bougie" />
      <AdCard imgUrl="/images/porte-magazine.webp" link="/ads/porte-magazine" price={45} title="porte-magazine" />

      </section>
    </main>
    )}