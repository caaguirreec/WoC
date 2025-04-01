import { create } from 'zustand'

interface AvatarCustomization {
  bodyColor: string
  headColor: string
  clothing: string[]
  accessories: string[]
}

interface Store {
  avatarCustomization: AvatarCustomization
  setAvatarCustomization: (customization: Partial<AvatarCustomization>) => void
  inventory: string[]
  addToInventory: (item: string) => void
  removeFromInventory: (item: string) => void
}

export const useStore = create<Store>((set) => ({
  avatarCustomization: {
    bodyColor: '#ffd700',
    headColor: '#ffd700',
    clothing: [],
    accessories: [],
  },
  setAvatarCustomization: (customization) =>
    set((state) => ({
      avatarCustomization: { ...state.avatarCustomization, ...customization },
    })),
  inventory: [],
  addToInventory: (item) =>
    set((state) => ({ inventory: [...state.inventory, item] })),
  removeFromInventory: (item) =>
    set((state) => ({
      inventory: state.inventory.filter((i) => i !== item),
    })),
})) 