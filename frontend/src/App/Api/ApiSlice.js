import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../Constants";

const baseQuery = fetchBaseQuery({ baseQuery: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Products", "Order", "User", "Category"],
  endpoints: () => ({}),
});
