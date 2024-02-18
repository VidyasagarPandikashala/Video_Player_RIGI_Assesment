import { configureStore } from "@reduxjs/toolkit";
import databaseReducer from "../applicationslice/appSlice";

export default configureStore({
  reducer: {
    database: databaseReducer,
  },
});

// import { configureStore } from "@reduxjs/toolkit";
// import databaseReducer from "../applicationslice/appSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import createIdbStorage from "redux-persist-indexeddb-storage";

// const IDBStorage = createIdbStorage({
//   name: "my-app",
//   storeName: "key-value-store",
// });

// const persistConfig = {
//   key: "root",
//   storage: IDBStorage,
// };

// const persistedReducer = persistReducer(persistConfig, databaseReducer);

// const store = configureStore({
//   reducer: {
//     database: persistedReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });

// let persistor = persistStore(store);

// export { store, persistor };
