import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const customerAPI = createApi({
    reducerPath: "customerAPI",
     baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_SERVER}/api/v1/customers/` }),
     tagTypes : ["customer"],
      endpoints: (builder) => ({

        allCustomers: builder.query({
            query: () => {
                return {
                    url:`all`,
                    credentials: "include",
                };
            },
            providesTags: ["customer"]
        }),
    }),
});
export const {
    useAllCustomersQuery,
    // useDeleteOrderMutation,
 } = customerAPI;






