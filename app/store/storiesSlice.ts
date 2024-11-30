import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface StoryItem {
  id: number;
  title: string;
  by: string;
  score: number;
  type: string;
}

interface StoriesState {
  items: StoryItem[];
  loading: boolean;
  page: number;
}

const initialState: StoriesState = {
  items: [],
  loading: false,
  page: 1,
};



const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<StoryItem[]>) => {
      state.items = [...state.items, ...action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    incrementPage: state => {
      state.page += 1;
    },
    clearStories: state => {
      state.items = [];
      state.page = 1;
    },
  },
});

export const {setStories, setLoading, incrementPage, clearStories} =
  storiesSlice.actions;
export default storiesSlice.reducer;
