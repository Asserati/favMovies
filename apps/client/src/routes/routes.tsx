import FavoriteList from "../pages/FavoriteList";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import ProtectedPage from "../components/common/ProtectedPage";

export const routesGen = {
  home: "/",
  mediaList: (type: string) => `/${type}`,
  mediaDetail: (type: string, id: number) => `/${type}/${id}`,
  mediaSearch: "/search",
  favoriteList: "/favorites",
};

const routes = [
  {
    index: true,
    path: "/",
    element: <MediaList />,
    state: "movie",
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search",
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: "favorites",
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />,
  },
];

export default routes;
