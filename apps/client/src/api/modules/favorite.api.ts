import privateClient from "../client/private.client";

const favoriteEndpoints = {
  list: "user/favorites",
  add: "user/favorites",
  remove: ({ favoriteId }: { favoriteId: number }) =>
    `user/favorites/${favoriteId}`,
};

type Fav = {
  mediaId: number;
  title: string;
  poster: string;
  rate: number;
};
export type ListItem = {
  id: number;
  title: string;
  mediaId?: number;
  mediaType?: string;
  rate?: number;
  poster?: string;
};

type MakeRequestResponse<T> = {
  response?: T;
  err?: Error | unknown;
};

type RemoveApiResponse = {
  message: string;
};

type favApiResponse = {
  id: number;
  title: string;
  mediaId: number;
  mediaType: string;
  rate: number;
  poster: string;
};

const favoriteApi = {
  getList: async (): Promise<MakeRequestResponse<favApiResponse[]>> => {
    try {
      const response = await privateClient(favoriteEndpoints.list, {
        method: "GET",
      });

      if ("data" in response) {
        return { response: response.data as favApiResponse[] };
      } else {
        throw new Error("Invalid response type");
      }
    } catch (err) {
      return { err };
    }
  },
  add: async ({
    mediaId,
    title,
    poster,
    rate,
  }: Fav): Promise<MakeRequestResponse<favApiResponse>> => {
    try {
      const response = await privateClient(favoriteEndpoints.add, {
        method: "POST",
        body: JSON.stringify({
          mediaId,
          title,
          poster,
          rate,
        }),
      });
      if ("data" in response) {
        return { response: response.data as favApiResponse };
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      return { err };
    }
  },
  remove: async ({
    favoriteId,
  }: {
    favoriteId: number;
  }): Promise<MakeRequestResponse<RemoveApiResponse>> => {
    try {
      const response = await privateClient(
        favoriteEndpoints.remove({ favoriteId }),
        { method: "DELETE" }
      );

      if ("data" in response) {
        return { response: response.data as RemoveApiResponse };
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      return { err };
    }
  },
};

export default favoriteApi;
