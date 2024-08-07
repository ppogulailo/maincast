import { configureStore, combineReducers, AsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const reducers = combineReducers({
  // auth: authReducer,
});

// [apiSlice.reducerPath]: apiSlice.reducer
const persistedReducer = persistReducer(
  { key: 'root', storage, blacklist: ['comment', 'post'] },
  reducers
);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // .concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export default store;

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;

export const useAppDispatch = () => useDispatch<AppDispatch>();