/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProfile
// ====================================================

export interface GetProfile_me {
  __typename: "UsersPermissionsMe";
  username: string;
  email: string;
}

export interface GetProfile {
  me: GetProfile_me | null;
}
