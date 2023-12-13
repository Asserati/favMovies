import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import MediaItem, { MediaItemExtend } from "./MediaItem";

export type TMediaItem = {
  medias: MediaItemExtend[];
  mediaType: string;
};
const RecommendSlide = ({ medias, mediaType }: TMediaItem) => {
  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendSlide;
