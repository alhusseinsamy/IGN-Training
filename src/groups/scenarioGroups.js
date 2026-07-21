import { csv, feed, group, jsonFile, pause, repeat } from "@gatling.io/core";
import { homePage, loginPage, productPage } from "../endpoints/webEndpoints";
import {
  cart,
  checkout,
  login,
  products,
  session,
} from "../endpoints/apiEndpoints";
import {
  chooseRandomProduct,
  chooseRandomProductPerPage,
  removePageNumberFromSession,
  setPageNumber,
  setSearchKey,
} from "../actions/actions";

const usersFeeder = jsonFile("data/users.json").circular();
const productsFeeder = csv("data/productUrls.csv").random();

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

export const browseAndAddToCartOnEachPageGroup = group(
  "Browse and add to cart on each page group",
).on(
  setSearchKey,
  removePageNumberFromSession,
  repeat(4, "pageNumber").on(products, chooseRandomProductPerPage, cart),
);

export const fetchProductGroup = group("Fetch product group").on(
  feed(productsFeeder),
  productPage,
);

export const checkoutGroup = group("Checkout group").on(checkout);
