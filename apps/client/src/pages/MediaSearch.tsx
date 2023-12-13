import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField, Toolbar } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";
import { MediaItemExtend } from "../components/common/MediaItem";

const mediaTypes = ["movie"];
let timer: NodeJS.Timeout;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState<MediaItemExtend[]>([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    setOnSearch(true);

    const { response, err } = await mediaApi.search({
      mediaType,
      query,
      page,
    });

    setOnSearch(false);

    if (err instanceof Error) toast.error(err.message);
    if (response) {
      const newMedias = response.results || []; // Assuming the data is directly in response
      if (page > 1) {
        setMedias((prevMedias) => [...prevMedias, ...newMedias]);
      } else {
        setMedias(newMedias);
      }
    }
  }, [query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [search, query, page]);

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          ></Stack>
          <TextField
            color="success"
            placeholder="Search MoonFlix"
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />

          <MediaGrid medias={medias} mediaType={mediaType} />

          {medias.length > 0 && (
            <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
              load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
