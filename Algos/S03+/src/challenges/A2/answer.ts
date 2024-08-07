/**
 * In this challenge, you have to add a list of tags to each category (based on
 * ad tags in the category). Duplicate tags for one category is not permitted. Tags
 * must me sorted alphabatically. Categories order, ads order and ads tags order must remain
 * untouched.
 *
 * @param categories List of categories without tags, but with ads
 * @returns List of categories with a new prop tags
 */

// ↓ uncomment bellow lines and add your response!
export default function ({
  categories,
}: {
  categories: Category[];
}): CategoryWithTags[] {
  return categories.map((category) => {
    // 1ere implementation: reduce, Set
    const tags = category.ads.reduce((acc: Array<string>, ad) => {
      return [...acc, ...ad.tags];
    }, []);
    const categoryWithTags: CategoryWithTags = {
      ...category,
      tags: [...new Set(tags)].sort(),
    };
    return categoryWithTags;

    //2nde implementation (@Logan): Set, flatMap (nécessite es2019)
    // const tags = [...new Set(category.ads.flatMap((ad) => ad.tags))].sort();
    // return { ...category, tags };
  });
}

// used interfaces, do not touch
interface Ad {
  title: string;
  price: number;
  tags: string[];
}

export interface Category {
  ads: Ad[];
  name: string;
}

export interface CategoryWithTags extends Category {
  tags: string[];
}
