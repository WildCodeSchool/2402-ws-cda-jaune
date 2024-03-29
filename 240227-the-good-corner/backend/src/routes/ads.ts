import { Router } from "express";
import { Ad } from "../data/entities/ad";
import { Like } from "typeorm";
import { Category } from "../data/entities/category";
import { Tag } from "../data/entities/tag";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const needle = req.query.needle;
    const categoryId = Number(req.query.categoryId);

    let ads;
    if (categoryId && needle) {
      ads = await Ad.find({
        where: {
          title: Like(`%${needle}%`),
          category: {
            id: categoryId,
          },
        },
      });
    } else if (categoryId) {
      ads = await Ad.find({
        where: {
          category: {
            id: categoryId,
          },
        },
      });
    } else if (needle) {
      ads = await Ad.find({
        where: {
          title: Like(`%${needle}%`),
        },
      });
    } else {
      ads = await Ad.find();
    }

    res.json(ads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ads", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const ad = await Ad.findOneBy({ id });
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    res.json(ad);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ad", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { title: req.body.category },
    });
    if (!category) {
      return res.status(400).json({ message: "Category does not exist" });
    }

    let tags: Tag[] = [];

    const tagCandidates: string[] = req.body.tags.split(",");
    if (tagCandidates.length)
      for (const tagTitle of tagCandidates) {
        let tag: Tag | undefined;
        const existingTag = await Tag.findOne({ where: { title: tagTitle } });

        if (existingTag) {
          tag = existingTag;
        } else {
          tag = Tag.create({ title: tagTitle });
          await Tag.insert(tag);
        }

        if (tag) {
          tags.push(tag);
        }
      }

    const ad = Ad.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.body.owner,
      price: req.body.price,
      imgUrl: req.body.imgUrl,
      location: req.body.location,
      category: category,
      tags: tags,
    });

    await Ad.insert(ad);
    res.status(201).json(ad);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating ad", error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  const adIdToDelete = Number(req.params.id);
  try {
    Ad.delete({ id: adIdToDelete });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting ad", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      title,
      description,
      owner,
      price,
      imgUrl,
      location,
      category,
      tags,
    } = req.body;

    const adToUpdate = await Ad.findOne({ where: { id } });
    if (!adToUpdate) {
      return res.status(404).json({ message: "Ad not found" });
    }

    adToUpdate.title = title;
    adToUpdate.description = description;
    adToUpdate.owner = owner;
    adToUpdate.price = price;
    adToUpdate.imgUrl = imgUrl;
    adToUpdate.location = location;
    adToUpdate.tags = [];

    if (category) {
      const existingCategory = await Category.findOne({
        where: { title: category },
      });
      if (!existingCategory) {
        return res.status(400).json({ message: "Category does not exist" });
      }
      adToUpdate.category = existingCategory;
    }

    if (tags) {
      for (const tagTitle of tags) {
        let tagEntity = await Tag.findOne({ where: { title: tagTitle } });
        if (!tagEntity) {
          tagEntity = Tag.create({ title: tagTitle });
          await tagEntity.save();
        }
        adToUpdate.tags.push(tagEntity);
      }
    }

    await adToUpdate.save();
    res.json(adToUpdate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating ad", error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      title,
      description,
      owner,
      price,
      imgUrl,
      location,
      category,
      tags,
    } = req.body;

    const adToUpdate = await Ad.findOne({
      where: { id },
      relations: ["category", "tags"],
    });
    if (!adToUpdate) {
      return res.status(404).json({ message: "Ad not found" });
    }

    if (title !== undefined) adToUpdate.title = title;
    if (description !== undefined) adToUpdate.description = description;
    if (owner !== undefined) adToUpdate.owner = owner;
    if (price !== undefined) adToUpdate.price = price;
    if (imgUrl !== undefined) adToUpdate.imgUrl = imgUrl;
    if (location !== undefined) adToUpdate.location = location;

    if (category) {
      const existingCategory = await Category.findOne({
        where: { title: category },
      });
      if (!existingCategory) {
        return res.status(400).json({ message: "Category does not exist" });
      }
      adToUpdate.category = existingCategory;
    }

    if (tags) {
      adToUpdate.tags = [];
      for (const tagTitle of tags) {
        let tagEntity = await Tag.findOne({ where: { title: tagTitle } });
        if (!tagEntity) {
          tagEntity = Tag.create({ title: tagTitle });
          await tagEntity.save();
        }
        adToUpdate.tags.push(tagEntity);
      }
    }
    await adToUpdate.save();

    res.json(adToUpdate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating ad", error: error.message });
  }
});

export default router;
