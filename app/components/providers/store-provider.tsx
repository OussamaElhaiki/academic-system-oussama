"use client"

import { createContext, useContext, ReactNode } from "react"
import { useStore } from "zustand"
import { appStore, IStoreState } from "../../store/app-store"
import { StoreApi } from "zustand"

const StoreContext = createContext<StoreApi<IStoreState> | null>(null)

const store = appStore()

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export function useBoundStore<T>(selector: (state: IStoreState) => T): T {
  const store = useContext(StoreContext)
  if (!store) throw new Error("Missing StoreProvider")
  return useStore(store, selector)
}