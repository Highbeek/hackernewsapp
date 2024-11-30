import {configureStore} from '@reduxjs/toolkit';
import storiesReducer from './storiesSlice';
import recentStoriesReducer from './RecentStoriesSlice';

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
    recentStories: recentStoriesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
