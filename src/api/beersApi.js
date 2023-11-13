// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const beersApi = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/users'
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.punkapi.com/v2" }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getBeers` endpoint is a "query" operation that returns data
    getBeers: builder.query({
      // The URL for the request is '/beers/'
      query: () => "/beers"
    }),
    listBeers: builder.query({
      query: (page = 1) => `/beers?page=${page}&per_page=10`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    }),
    searchBeer: builder.query({
      query: (beer_name, page = 1) =>
        `/beers?beer_name=${beer_name.trim()}&per_page=20`
    })
  })
});

// Export the auto-generated hook for the `getBeers` query endpoint
export const {
  useGetBeersQuery,
  useListBeersQuery,
  useSearchBeerQuery
} = beersApi;
