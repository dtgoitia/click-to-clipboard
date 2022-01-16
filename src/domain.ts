export type ItemId = number;
export interface StoredItemData {
  id?: ItemId;
  description: string;
  content: string;
  index?: number;
}

export interface ItemData {
  id: ItemId;
  description: string;
  content: string;
  index: number;
}
