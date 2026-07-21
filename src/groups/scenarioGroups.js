import { feed, group, jsonFile, pause } from "@gatling.io/core";
import { homePage, loginPage } from "../endpoints/webEndpoints";
import {
  cart,
  checkout,
  login,
  products,
  session,
} from "../endpoints/apiEndpoints";
import {
  chooseRandomProduct,
  setPageNumber,
  setSearchKey,
} from "../actions/actions";

const usersFeeder = jsonFile("data/users.json").circular();

export const homePageGroup = group("Homepage group").on(
  homePage,
  session,
  setPageNumber,
  setSearchKey,
  products,
);

export const loginGroup = group("Login group").on(
  loginPage,
  // pause(5, 15),
  feed(usersFeeder),
  login,
);

export const browseAndAddToCartGroup = group("Browse and add to cart group").on(
  setPageNumber,
  setSearchKey,
  products,
  chooseRandomProduct,
  cart,
);

export const checkoutGroup = group("Checkout group").on(checkout);
