import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const main = [
  {
    display: "movies",
    path: "/",
    state: "movie",
  },
  {
    display: "search",
    path: "/search",
    state: "search",
  },
];

const user = [
  {
    display: "favorites",
    path: "/favorites",
    state: "favorite",
  },
];

const menuConfigs = { main, user };

export default menuConfigs;
