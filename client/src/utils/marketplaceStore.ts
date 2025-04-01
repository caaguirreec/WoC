import { create } from 'zustand'

export interface MarketplaceItem {
  id: string
  name: string
  type: 'bicycle' | 'clothing' | 'accessory'
  price: number
  description: string
  model?: string // 3D model path
  thumbnail?: string
}

interface MarketplaceStore {
  items: MarketplaceItem[]
  selectedItem: MarketplaceItem | null
  isOpen: boolean
  setSelectedItem: (item: MarketplaceItem | null) => void
  toggleMarketplace: () => void
  purchaseItem: (itemId: string) => void
}

const initialItems: MarketplaceItem[] = [
  {
    id: 'bike-1',
    name: 'Mountain Pro X1',
    type: 'bicycle',
    price: 1200,
    description: 'Professional mountain bike with advanced suspension',
    thumbnail: '/thumbnails/bike-1.png'
  },
  {
    id: 'bike-2',
    name: 'City Cruiser',
    type: 'bicycle',
    price: 800,
    description: 'Comfortable city bike perfect for urban riding',
    thumbnail: '/thumbnails/bike-2.png'
  },
  {
    id: 'clothing-1',
    name: 'Pro Cycling Jersey',
    type: 'clothing',
    price: 80,
    description: 'Breathable cycling jersey with UV protection',
    thumbnail: '/thumbnails/jersey-1.png'
  },
  {
    id: 'accessory-1',
    name: 'Smart Helmet',
    type: 'accessory',
    price: 150,
    description: 'Smart helmet with built-in lights and indicators',
    thumbnail: '/thumbnails/helmet-1.png'
  }
]

export const useMarketplaceStore = create<MarketplaceStore>((set) => ({
  items: initialItems,
  selectedItem: null,
  isOpen: false,
  setSelectedItem: (item) => set({ selectedItem: item }),
  toggleMarketplace: () => set((state) => ({ isOpen: !state.isOpen })),
  purchaseItem: (itemId) => {
    set((state) => {
      const item = state.items.find(i => i.id === itemId)
      if (!item) return state
      
      // Here you would typically make an API call to process the purchase
      console.log(`Purchased item: ${item.name}`)
      
      return state
    })
  }
})) 