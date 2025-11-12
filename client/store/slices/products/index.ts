import { Product, ProductCreateData, ProductFilters } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Product", "Categories"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], ProductFilters>({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters.searchQuery)
          params.append("searchQuery", filters.searchQuery);
        if (filters.categories?.length) {
          params.append("categories", filters.categories.join(","));
        }
        if (filters.minPrice !== undefined)
          params.append("minPrice", filters.minPrice.toString());
        if (filters.maxPrice !== undefined)
          params.append("maxPrice", filters.maxPrice.toString());
        if (filters.sortByPrice)
          params.append("sortByPrice", filters.sortByPrice);

        return `/product?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/product/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Product", id: slug }],
    }),

    getRelatedProducts: builder.query<
      Product[],
      { slug: string; category: string }
    >({
      query: ({ slug, category }) => `/product/related/${slug}/${category}`,
      providesTags: [{ type: "Product", id: "RELATED" }],
    }),

    getCategories: builder.query<string[], void>({
      query: () => "/product/categories",
      providesTags: [{ type: "Categories", id: "LIST" }],
    }),

    createProduct: builder.mutation<Product, ProductCreateData>({
      query: (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", data.price.toString());
        formData.append("availability", data.availability.toString());
        formData.append("image", data.image);

        return {
          url: "/product",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [
        { type: "Product", id: "LIST" },
        { type: "Categories", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetRelatedProductsQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
} = productApi;
