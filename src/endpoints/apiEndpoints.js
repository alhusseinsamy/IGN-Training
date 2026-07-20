import { jmesPath } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

export const session = http("Session").get("/session").check(status().is(200));

export const products = http("Products")
  .get("/products")
  .queryParam("page", "#{pageNumber}")
  .queryParam("search", "#{searchKey}")
  .check(status().is(200));

export const login = http("Login")
  .post("/login")
  .formParam("username", "#{username}")
  .formParam("password", "#{password}")
  .check(jmesPath("accessToken").saveAs("accessToken"))
  .check(status().is(200));
