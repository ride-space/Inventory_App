import { configureStore } from '@reduxjs/toolkit';
import { CounterReducer } from 'src/reducks/CounterStore';
import { serverApi } from 'src/service';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(serverApi.middleware);
  },
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    counter: CounterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
