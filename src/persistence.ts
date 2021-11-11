import { ItemData } from "./domain";

type StorageArea = browser.storage.StorageArea;

class Repository {
  private readonly key = "items";
  constructor(private readonly storage: StorageArea) {}

  public async writeItems(items: ItemData[]) {
    const raw = this.serializeItems(items);
    this.storage.set({ [this.key]: raw });
  }

  public async readItems(): Promise<ItemData[]> {
    const nothins_stored: ItemData[] = [];
    return this.storage
      .get(this.key)
      .then(storedObject => {
        if (!storedObject) {
          return nothins_stored;
        }
        const raw: string | undefined = (storedObject as object)[this.key];
        if (!raw) {
          return nothins_stored;
        }
        const storedItems = this.deserializeItems(raw);
        return storedItems;
      })
      .catch(reason => {
        alert(`error ${reason}`);
        return nothins_stored;
      });
  }

  private serializeItems(items: ItemData[]): string {
    const data = JSON.stringify(items);
    return data;
  }
  private deserializeItems(raw: string): ItemData[] {
    const items = JSON.parse(raw);
    return items;
  }
}

const repository = new Repository(browser.storage.local);
export default repository;
