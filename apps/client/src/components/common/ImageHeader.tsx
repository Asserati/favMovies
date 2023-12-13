import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import uiConfigs from "../../configs/ui.configs";

type TImageHeader = {
  imgPath: string;
};

const ImageHeader = ({ imgPath }: TImageHeader) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        zIndex: "-1",
        position: "relative",
        paddingTop: { xs: "60%", sm: "40%", md: "35%" },
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundImage: `url(${imgPath})`,
        backgroundAttachment: "fixed",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    />
  );
};

export default ImageHeader;
