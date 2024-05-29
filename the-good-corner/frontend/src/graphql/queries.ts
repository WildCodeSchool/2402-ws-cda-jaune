import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES_AND_TAGS = gql`
  query GetAllCategoriesAndTags {
    getAllCategories {
      id
      name
    }
    getAllTags {
      id
      name
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query GetAdById($adId: String!) {
    getAdById(adId: $adId) {
      id
      title
      description
      owner {
        id
        mail
      }
      ville
      imgUrl
      price
    }
  }
`;

export const GET_ALL_ADS = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      price
      description
      owner {
        id
        mail
      }
      ville
      imgUrl
    }
  }
`;
