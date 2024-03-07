import express from "express";
import cors from "cors";
import "reflect-metadata";
import { dataSource } from "./data/config";
import { Ad } from "./data/entities/ad";
import { Category } from "./data/entities/category";
import { Like } from "typeorm";
import { Tag } from "./data/entities/tag";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Woohoo, ça fonctionne !");
});

app.get("/ads", async (req, res) => {
  const category = req.query.category;
  const needle = req.query.needle;

  //const tag = req.query.tag;

  // let criteria;
  // if (category || tag)
  //   criteria = {
  //     where: [
  //       {
  //         category: {
  //           title: category,
  //         },
  //         tags: {
  //           title: Like(`%${tag}%`),
  //         },
  //       },
  //     ],
  //   };

  let criteria;
  if(category) {
    criteria = {
      where: {
        category:{
          id:category
        }
      }
    }
  }
  if(needle) {
    criteria = {
      where: {
        title:Like(`%${needle}%`)
      }
    }
  }


  const ads = await Ad.find(criteria);
  res.json(ads);
});

app.get("/ads/:id", async (req, res) => {
  const id = req.params.id;
  const ad = await Ad.findOneBy({id: Number(id)});
  res.json(ad);
});

app.post("/ads", async (req, res) => {
  const newAd = new Ad();
  newAd.title = req.body.title;
  newAd.description = req.body.description;
  newAd.owner = req.body.owner;
  newAd.price = req.body.price;
  newAd.imgUrl = req.body.imgUrl;
  newAd.location = req.body.location;
  newAd.createdAt = req.body.createdAt;
  newAd.category = await Category.findOneBy({ title: req.body.category });

  const tags: Tag[] = req.body.tags.split(",").map(async (tagCandidate) => {
    let tag = await Tag.findOneBy({ title: tagCandidate });
    if (!tag) {
      tag = new Tag();
      tag.title = tagCandidate;
      await tag.save();
    }
    return tag;
  });
  newAd.tags = await Promise.all(tags);

  await newAd.save();
  res.json(newAd);
});

app.delete("/ads/:id", (req, res) => {
  const adIdToDelete = Number(req.params.id);
  Ad.delete({ id: adIdToDelete });
  res.status(204).send();
});

app.put("/ads/:id", async (req, res) => {
  const adIdToReplace = Number(req.params.id);
  const adToReplace = await Ad.findOneBy({ id: adIdToReplace });

  adToReplace.title = req.body.title;
  adToReplace.description = req.body.description;
  adToReplace.owner = req.body.owner;
  adToReplace.price = req.body.price;
  adToReplace.imgUrl = req.body.imgUrl;
  adToReplace.location = req.body.location;
  adToReplace.category = await Category.findOneBy({ title: req.body.category });

  const tags: Tag[] = req.body.tags.map(async (tagCandidate) => {
    let tag = await Tag.findOneBy({ title: tagCandidate });
    if (!tag) {
      tag = new Tag();
      tag.title = tagCandidate;
      await tag.save();
    }
    return tag;
  });
  adToReplace.tags = await Promise.all(tags);

  adToReplace.save();
  res.status(200).send();
});

// app.patch("/ads/:id", (req, res) => {
//   const adIdToReplace = Number(req.params.id);
//   ads = ads.map((ad) => {
//     if (ad.id !== adIdToReplace) return ad;

//     let updatedAd = ad;
//     Object.keys(req.body).forEach((field) => {
//       if (field in updatedAd) {
//         updatedAd[field] = req.body[field as keyof Ad];
//       }
//     });
//     updatedAd.id = adIdToReplace;
//     return updatedAd;
//   });
//   res.status(200).send();
// });

app.get("/categories", async (req, res) => {
  const needle = req.query.needle || "";
  const categories = await Category.find({
    where: { title: Like(`%${needle}%`) },
  });
  res.json(categories);
});

app.get("/tags", async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`API Server listening on http://localhost:${port}`);
});
