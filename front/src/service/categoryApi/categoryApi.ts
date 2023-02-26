import type { Category, Date, Product } from '@prisma/client';
import { serverApi } from 'src/service/serverApi';
import { z } from 'zod';

// const categoryWithTags = serverApi.enhanceEndpoints({
//   addTagTypes: ['Category'],
//   endpoints: {
//     getUserByUserId: {
//       providesTags: [{ id: 'LIST', type: 'Category' }],
//     },
//     postCategory: {
//       invalidatesTags: ['Category'],
//     },
//     // // alternatively, define a function which is called with the endpoint definition as an argument
//     // getUsers(endpoint) {
//     //   endpoint.providesTags = ['User']
//     //   endpoint.keepUnusedDataFor = 120
//     // },
//   },
// });

export const categoryApi = serverApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getCategories: builder.query<GetCategory[], void>({
        providesTags: ['Category'],
        query: () => {
          return {
            method: 'get',
            url: '/categories',
          };
        },
      }),
      postCategory: builder.mutation<GetCategory, string>({
        invalidatesTags: ['Category'],
        query: (name) => {
          return {
            data: { name },
            method: 'post',
            url: '/category',
          };
        },
      }),
    };
  },
  overrideExisting: false,
});

export const { useGetCategoriesQuery, usePostCategoryMutation } = categoryApi;

export type CategoryProduct = Product & { date: Date[] };
export type GetCategory = {
  id: Category['id'];
  name: Category['name'];
  products: CategoryProduct[];
};

export const PostCategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
});

export type PostCategory = z.infer<typeof PostCategorySchema>;
