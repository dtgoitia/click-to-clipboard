import { ItemData } from "./domain";

// type StorageArea = browser.storage.StorageArea;

class Repository {
  private readonly key = "items";
  constructor(private readonly storage: Storage) {}

  public async writeItems(items: ItemData[]) {
    const raw = this.serializeItems(items);
    this.storage.setItem(this.key, raw);
  }

  public async readItems(): Promise<ItemData[]> {
    const raw: string = this.get(this.key);
    if (!raw) {
      return [];
    }
    const storedItems = this.deserializeItems(raw);
    return storedItems;
  }

  private serializeItems(items: ItemData[]): string {
    const data = JSON.stringify(items);
    return data;
  }
  private deserializeItems(raw: string): ItemData[] {
    const items = JSON.parse(raw);
    return items;
  }

  private get(key: string): string | null {
    const raw: string = this.storage.getItem(key);
    if (raw === "null") {
      return null;
    }
    return raw;
  }
}

const repository = new Repository(window.localStorage);
export default repository;
