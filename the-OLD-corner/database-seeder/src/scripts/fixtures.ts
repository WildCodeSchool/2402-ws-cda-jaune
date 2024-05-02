import { Ad } from "../data/entities/ad";
import { Category } from "../data/entities/category";
import { Tag } from "../data/entities/tag";
import { dataSource } from "../data/config";

const tagsData = [
  {
    title: "Blue",
  },
];

const categoriesData = [
  {
    title: "Others",
  },
];

const adsData = [
  {
    title: "Bike",
    description: "My awesome blue bike",
    imgUrl: "",
    location: "Lille",
    owner: "Loic",
    price: 200,
  },
];

async function generateAndSaveFixtures() {
  try {
    await dataSource.initialize();

    const savedTags = await Promise.all(
      tagsData.map(async (tagData) => {
        const tag = new Tag();
        tag.title = tagData.title;
        return tag.save();
      })
    );
    console.log("Tags enregistrés avec succès:", savedTags.length);

    const savedCategories = await Promise.all(
      categoriesData.map(async (categoryData) => {
        const category = new Category();
        category.title = categoryData.title;
        return category.save();
      })
    );
    console.log("Categories enregistrées avec succès:", savedCategories.length);

    const savedAds = await Promise.all(
      adsData.map(async (adData) => {
        const ad = new Ad();
        ad.title = adData.title;
        ad.description = adData.description;
        ad.imgUrl = adData.imgUrl;
        ad.location = adData.imgUrl;
        ad.owner = adData.owner;
        ad.price = adData.price;
        ad.category = savedCategories[0];
        ad.tags = [savedTags[0]];

        return ad.save();
      })
    );
    console.log("Annonces enregistrées avec succès:", savedAds.length);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des fixtures:", error);
  } finally {
    await dataSource.destroy();
  }
}
generateAndSaveFixtures();
