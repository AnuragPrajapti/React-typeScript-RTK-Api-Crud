import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ISignIn,
  IFromInput,
  PostUserResponse,
  IUserData,
  IAddUser,
} from "../components/interFace";

const Token: string | null = JSON.parse(localStorage.getItem("getToken")!);

export const callApiMethods = createApi({
  reducerPath: "callApiData",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://secondmorelive.herokuapp.com/",
  }),

  endpoints: (build) => ({
    getSignUpUser: build.mutation<IFromInput, Partial<IFromInput>>({
      query: (signUpUser) => ({
        url: "register",
        method: "POST",
        body: signUpUser,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    getSignInUser: build.mutation<ISignIn, Partial<ISignIn>>({
      query: (signInUser) => ({
        url: "login",
        method: "POST",
        body: signInUser,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    getAllUserData: build.query<PostUserResponse, void>({
      query: () => ({
        url: "get",
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }),
    }),

    getAddUser: build.mutation<IAddUser, Partial<IAddUser>>({
      query: (addUser) => ({
        url: "post",
        method: "POST",
        body: addUser,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }),
    }),

    getDeleteUser: build.mutation<IUserData, Partial<IUserData>>({
      query: (data) => {
        const id = data?._id;
        return {
          url: `delete/${id}`,
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
      },
    }),
    getEitUser: build.mutation<IAddUser, Partial<IAddUser>>({
      query: (editDAta) => {
        const id = editDAta?._id;
        return {
          url: `get/${id}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
      },
    }),
    getUpdateUser: build.mutation<IAddUser, Partial<IAddUser>>({
      query: (updateUser) => {
        console.log("updateApi", updateUser);
        const id = updateUser?._id;
        console.log(id);
        return {
          url: `update/${id}`,
          method: "PUT",
          body: updateUser,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetSignUpUserMutation,
  useGetSignInUserMutation,
  useGetAllUserDataQuery,
  useGetDeleteUserMutation,
  useGetAddUserMutation,
  useGetEitUserMutation,
  useGetUpdateUserMutation,
} = callApiMethods;
