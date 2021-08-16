/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_COMPONENTPAGEHIGHLIGHT_ALLIGNMENT } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCart
// ====================================================

export interface GetCart_cart_cart_highlight_background {
  __typename: "UploadFile";
  url: string;
}

export interface GetCart_cart_cart_highlight_floatImage {
  __typename: "UploadFile";
  url: string;
}

export interface GetCart_cart_cart_highlight {
  __typename: "ComponentPageHighlight";
  title: string;
  subtitle: string;
  background: GetCart_cart_cart_highlight_background | null;
  floatImage: GetCart_cart_cart_highlight_floatImage | null;
  buttonLabel: string;
  buttonLink: string;
  allignment: ENUM_COMPONENTPAGEHIGHLIGHT_ALLIGNMENT | null;
}

export interface GetCart_cart_cart_games_cover {
  __typename: "UploadFile";
  url: string;
}

export interface GetCart_cart_cart_games_developers {
  __typename: "Developer";
  name: string;
}

export interface GetCart_cart_cart_games {
  __typename: "Game";
  name: string;
  slug: string;
  cover: GetCart_cart_cart_games_cover | null;
  developers: GetCart_cart_cart_games_developers[];
  price: number;
}

export interface GetCart_cart_cart {
  __typename: "ComponentPagePopularGames";
  title: string | null;
  highlight: GetCart_cart_cart_highlight | null;
  games: GetCart_cart_cart_games[];
}

export interface GetCart_cart {
  __typename: "Cart";
  cart: GetCart_cart_cart | null;
}

export interface GetCart {
  cart: GetCart_cart | null;
}
