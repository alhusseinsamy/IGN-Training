import { exec } from "@gatling.io/core";

export const setPageNumber = exec((session) => session.set("pageNumber", "0"));
export const setSearchKey = exec((session) => session.set("searchKey", ""));

export const chooseRandomProduct = exec((session) => {
  const productsList = JSON.parse(session.get("productsList"));
  const selectedProduct =
    productsList[Math.floor(Math.random() * productsList.length)];
  const cartItems = JSON.stringify([selectedProduct]);
  return session.set("cartItems", cartItems);
});

export const chooseRandomProductPerPage = exec((session) => {
  const productsList = JSON.parse(session.get("productsList"));
  const selectedProduct =
    productsList[Math.floor(Math.random() * productsList.length)];

  const cartItems = session.contains("cartItems")
    ? JSON.parse(session.get("cartItems"))
    : [];

  cartItems.push(selectedProduct);
  return session.set("cartItems", JSON.stringify(cartItems));
});

export const removePageNumberFromSession = exec((session) =>
  session.remove("pageNumber"),
);
