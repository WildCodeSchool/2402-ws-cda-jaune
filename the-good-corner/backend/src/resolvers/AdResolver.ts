import {
  Arg,
  Authorized,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Category } from "../entities/category";
import { Ad } from "../entities/ad";
import { Tag } from "../entities/tag";
import { User } from "../entities/user";

@InputType()
class NewAdInput implements Partial<Ad> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => String, { nullable: true })
  imgUrl?: string | undefined;

  @Field()
  ville: string;

  @Field(() => ID)
  category: Category;

  @Field(() => [ID])
  tags?: Tag[] | undefined;
}

@Resolver(Ad)
class AdResolver {
  @Query(() => [Ad])
  async getAllAds() {
    const ads = await Ad.find({ relations: { category: true } });
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("adId") adId: string) {
    const ad = await Ad.findOneByOrFail({ id: Number.parseInt(adId) });
    return ad;
  }

  @Authorized()
  @Mutation(() => Ad)
  async createNewAd(@Arg("data") newAdData: NewAdInput, @Ctx() ctx: any) {
    const owner = await User.findOneByOrFail({ id: ctx.id });
    const resultFromSave = await Ad.save({ ...newAdData, owner });
    const resultForApi = await Ad.find({
      relations: { category: true },
      where: { id: resultFromSave.id },
    });
    return resultForApi[0];
  }

  @Authorized("MODERATOR")
  @Mutation(() => Ad)
  async deleteAd(@Arg("adId") adId: number) {
    const ad = await Ad.findOneByOrFail({ id: adId });
    ad.remove();
    return ad;
  }
}

export default AdResolver;
