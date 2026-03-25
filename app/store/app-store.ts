import { createStore } from "zustand"
import { createNavigationSlice } from "./navigation-slice"
import { createNotificationSlice } from "./notification-slice"
import { INavSlice, INotificationSlice } from "./store-t"

export type IStoreState = INavSlice & INotificationSlice

export const appStore = () =>
  createStore<IStoreState>()((...a) => ({
    ...createNavigationSlice(...a),
    ...createNotificationSlice(...a),
  }))