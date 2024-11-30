import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface StoryItem {
  id: number;
  title: string;
  by: string;
  score: number;
  type: string;
}

interface RecentStoriesState {
  recentItems: StoryItem[];
  loading: boolean;
}

const initialState: RecentStoriesState = {
  recentItems: [],
  loading: false,
};

const recentStoriesSlice = createSlice({
  name: 'recentStories',
  initialState,
  reducers: {
    setRecentStories: (state, action: PayloadAction<StoryItem[]>) => {
      state.recentItems = action.payload;
    },
    setLoadingRecent: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {setRecentStories, setLoadingRecent} = recentStoriesSlice.actions;
export default recentStoriesSlice.reducer;
