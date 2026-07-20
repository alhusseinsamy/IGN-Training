import { http, status } from "@gatling.io/http";

export const session = http("Session").get("/session").check(status().is(200));
