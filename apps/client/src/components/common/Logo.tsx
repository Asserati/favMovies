import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      Fav<span style={{ color: theme.palette.primary.main }}>Movies</span>
    </Typography>
  );
};

export default Logo;
