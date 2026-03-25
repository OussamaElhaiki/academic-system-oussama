export interface INotificationSlice {
  messages: string[]
  setMessage: (message: string) => void
}

export interface INavSlice {
  menu: { title: string; slug: string }[]
  setMenu: (menu: { title: string; slug: string }[]) => void
}