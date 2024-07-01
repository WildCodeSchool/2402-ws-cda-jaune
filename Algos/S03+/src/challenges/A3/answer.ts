/**
 * In this challenge, you must find and attach to each ad the ad (or ads)
 * with which the current ad has the most tags in common. This algo will
 * be very useful to get similar products of a given product.
 * Attached ads must be sorted by their title (A to Z).
 * You must not change the order of the main list of ads.
 *
 * @param ads List of ads without closestAds
 * @returns The same list but with a new closestAds prop on each
 */

// ↓ uncomment bellow lines and add your response!

function intersection(ad1, ad2): number {
  const commonElts = ad1.tags.filter((elt) => ad2.tags.includes(elt));
  return commonElts.length;
}

export default function ({
  ads,
}: {
  ads: AdWithTags[];
}): AdWithTagsAndClosestAds[] {
  return ads.map((ad) => {
    //Calcul du nombre max de tags en commun
    const maxCommonTags = ads
      .filter((elt) => elt.title !== ad.title) //dedoublonnage
      .reduce((acc, elt) => {
        return Math.max(intersection(ad, elt), acc);
      }, 0);
    let closestAds: AdWithTags[] = [];
    if (maxCommonTags) {
      closestAds = ads
        .filter(
          (elt) =>
            elt.title !== ad.title && intersection(elt, ad) === maxCommonTags
        )
        .sort((ad1, ad2) => (ad1.title > ad2.title ? 1 : -1)); //tri alphabetique du titre
    }
    return { ...ad, closestAds }; //Clone de l'ad original + nouvelle cle
  });
}

// used interfaces, do not touch
export interface AdWithTags {
  title: string;
  price: number;
  tags: string[];
}

export interface AdWithTagsAndClosestAds extends AdWithTags {
  closestAds: AdWithTags[];
}
