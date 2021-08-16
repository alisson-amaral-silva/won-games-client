/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_COMPONENTPAGEHIGHLIGHT_ALLIGNMENT } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetUpcoming
// ====================================================

export interface GetUpcoming_upcommingMoreGames_cover {
  __typename: "UploadFile";
  url: string;
}

export interface GetUpcoming_upcommingMoreGames_developers {
  __typename: "Developer";
  name: string;
}

export interface GetUpcoming_upcommingMoreGames {
  __typename: "Game";
  name: string;
  slug: string;
  cover: GetUpcoming_upcommingMoreGames_cover | null;
  developers: GetUpcoming_upcommingMoreGames_developers[];
  price: number;
}

export interface GetUpcoming_showcase_upcomingGames_highlight_background {
  __typename: "UploadFile";
  url: string;
}

export interface GetUpcoming_showcase_upcomingGames_highlight_floatImage {
  __typename: "UploadFile";
  url: string;
}

export interface GetUpcoming_showcase_upcomingGames_highlight {
  __typename: "ComponentPageHighlight";
  title: string;
  subtitle: string;
  background: GetUpcoming_showcase_upcomingGames_highlight_background | null;
  floatImage: GetUpcoming_showcase_upcomingGames_highlight_floatImage | null;
  buttonLabel: string;
  buttonLink: string;
  allignment: ENUM_COMPONENTPAGEHIGHLIGHT_ALLIGNMENT | null;
}

export interface GetUpcoming_showcase_upcomingGames {
  __typename: "ComponentPageSection";
  title: string | null;
  highlight: GetUpcoming_showcase_upcomingGames_highlight | null;
}

export interface GetUpcoming_showcase {
  __typename: "Home";
  upcomingGames: GetUpcoming_showcase_upcomingGames | null;
}

export interface GetUpcoming {
  upcommingMoreGames: GetUpcoming_upcommingMoreGames[];
  showcase: GetUpcoming_showcase | null;
}

export interface GetUpcomingVariables {
  date: any;
}
