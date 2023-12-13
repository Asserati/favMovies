import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
};
type MakeRequestResponse<T> = {
  response?: T;
  err?: Error | unknown;
};
type SignApiResponse = {
  username: string;
  id: number;
  token: string;
};

type InfoApiResponse = {
  payload: {
    sub: number;
    name: string;
  };
};

const userApi = {
  signin: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<MakeRequestResponse<SignApiResponse>> => {
    try {
      const response = await publicClient(userEndpoints.signin, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      return { response: response.data as SignApiResponse };
    } catch (err) {
      console.log("err");
      return { err };
    }
  },
  signup: async ({
    username,
    password,
    confirmPassword,
  }: {
    username: string;
    password: string;
    confirmPassword: string;
  }): Promise<MakeRequestResponse<SignApiResponse>> => {
    try {
      const response = await publicClient(userEndpoints.signup, {
        method: "POST",
        body: JSON.stringify({ username, password, confirmPassword }),
      });
      return { response: response.data as SignApiResponse };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async (): Promise<MakeRequestResponse<InfoApiResponse>> => {
    try {
      const response = await privateClient(userEndpoints.getInfo, {
        method: "GET",
      });
      return { response: response.data as InfoApiResponse };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
