import { MediaItemExtend } from "../../components/common/MediaItem";
import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
import { Genre } from "../../components/common/HeroSlide";
import { Video } from "../../components/common/MediaVideosSlide";

type ListProps = {
  mediaType: string;
  mediaCategory: string;
  page: number;
};
type DetailProps = {
  mediaType: string;
  mediaId: string;
};
type SearchProps = {
  mediaType: string;
  query: string;
  page: number;
};

type MakeRequestResponse<T> = {
  response?: T;
  err?: Error | unknown;
};

export type MediaApiResponse = {
  page: number;
  results: MediaItemExtend[]; // Adjust this based on your actual response structure
};
type Videos = {
  id: number;
  results: Video[];
};

export type DetailApiResponse = MediaItemExtend & {
  genres: Genre[];
  isFavorite: boolean;
  videos: Videos;
  recommend: MediaItemExtend[];
};

export type SearchApiResponse = {
  page: number;
  results: MediaItemExtend[];
};
const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }: ListProps) =>
    `list/${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }: DetailProps) =>
    `detail/${mediaType}/${mediaId}`,
  search: ({ mediaType, query, page }: SearchProps) =>
    `search/${mediaType}?query=${query}&page=${page}`,
};

const mediaApi = {
  getList: async ({
    mediaType,
    mediaCategory,
    page,
  }: ListProps): Promise<MakeRequestResponse<MediaApiResponse>> => {
    try {
      const response = await publicClient(
        mediaEndpoints.list({ mediaType, mediaCategory, page }),
        { method: "GET" }
      );

      if ("data" in response) {
        return { response: response.data as MediaApiResponse };
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      return { err };
    }
  },
  getDetail: async ({
    mediaType,
    mediaId,
  }: DetailProps): Promise<MakeRequestResponse<DetailApiResponse>> => {
    try {
      const response = await privateClient(
        mediaEndpoints.detail({ mediaType, mediaId }),
        {
          method: "GET",
        }
      );
      if ("data" in response) {
        return { response: response.data as DetailApiResponse };
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      return { err };
    }
  },

  search: async ({
    mediaType,
    query,
    page,
  }: SearchProps): Promise<MakeRequestResponse<SearchApiResponse>> => {
    try {
      const response = await publicClient(
        mediaEndpoints.search({ mediaType, query, page }),
        { method: "GET" }
      );

      if ("data" in response) {
        return { response: response.data as SearchApiResponse };
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;
