import { Genre } from "../../components/common/HeroSlide";
import publicClient from "../client/public.client";

const genreEndpoints = {
  list: ({ mediaType }: { mediaType: string }) => `genres/${mediaType}`,
};

type MakeRequestResponse<T> = {
  response?: T;
  err?: Error | unknown;
};

type GenreApiResponse = {
  genres: Genre[];
};
const genreApi = {
  getList: async ({
    mediaType,
  }: {
    mediaType: string;
  }): Promise<MakeRequestResponse<GenreApiResponse>> => {
    try {
      const response = await publicClient(genreEndpoints.list({ mediaType }), {
        method: "GET",
      });

      if ("data" in response) {
        return { response: response.data as GenreApiResponse };
      }
    } catch (err) {
      return { err };
    }
  },
};

export default genreApi;
