import { ElFileBody, jmesPath } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

export const session = http("Session")
  .get("/session")
  .check(status().is(200))
  .check(jmesPath("sessionId").saveAs("sessionId"));

export const products = http("Products")
  .get("/products")
  .queryParam("page", "#{pageNumber}")
  .queryParam("search", "#{searchKey}")
  .check(status().is(200))
  .check(jmesPath("products").saveAs("productsList"));

export const login = http("Login")
  .post("/login")
  .formParam("username", "#{username}")
  .formParam("password", "#{password}")
  .check(jmesPath("accessToken").saveAs("accessToken"))
  .check(status().is(200));

export const cart = http("Add to cart")
  .post("/cart")
  .body(ElFileBody("bodies/cart.json"))
  .check(status().is(200));

export const checkout = http("Checkout")
  .post("/checkout")
  .header("Authorization", "#{accessToken}")
  .body(ElFileBody("bodies/cart.json"))
  .check(status().is(200));
