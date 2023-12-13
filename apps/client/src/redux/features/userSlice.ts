import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type User = {
  id: number;
  username: string;
  access_token?: string;
};

type UserState = {
  user: User | null;
  listFavorites: FavoritePayload[] | null;
};

type FavoritePayload = {
  title: string;
  mediaId: number;
  rate: number;
  poster: string;
  id: number;
  mediaType: string;
};

const initialState: UserState = {
  user: null,
  listFavorites: [],
};
export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.access_token)
          localStorage.setItem("actkn", action.payload.access_token);
      }

      state.user = action.payload;
    },
    setListFavorites: (state, action: PayloadAction<FavoritePayload[]>) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action: PayloadAction<{ mediaId: number }>) => {
      const { mediaId } = action.payload;
      state.listFavorites = state.listFavorites.filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },

    addFavorite: (state, action: PayloadAction<FavoritePayload>) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, () => {
        console.log("pending");
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.user = action.payload;
        }
      );
  },
});

export const getUser = createAsyncThunk("user/getUser", async (user: User) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return user;
});

export const { setUser, setListFavorites, addFavorite, removeFavorite } =
  userSlice.actions;

export default userSlice.reducer;
