import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { readClipboard } from "./clipboard";
import AddItemForm from "./components/AddItemForm";
import CopyableItems from "./components/CopyableItems";
import { ItemData, ItemId, StoredItemData } from "./domain";
import repository from "./persistence";
import { disableTextSelection } from "./style";

enum SortAction {
  KeepOrder = -1,
  SwapOrder = 1,
}

function itemSorter(a: ItemData, b: ItemData): number {
  /*
      > 0 --> b, a
      < 0 --> a, b
    === 0 --> (do nothing)
  */
  if (a.index < b.index) {
    return SortAction.KeepOrder;
  }
  return SortAction.SwapOrder;
}

const WIDTH_OF_STUDIO_HEADER = "45px";
const WIDTH_OF_STUDIO_FOOTER = "45px";
const Page = styled.div`
  font-family: Sans;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;

  /* to occupy the whole space */
  width: 100%;
  height: calc(100vh - ${WIDTH_OF_STUDIO_HEADER} - ${WIDTH_OF_STUDIO_FOOTER});
`;

const Body = styled.div`
  order: 1;
  flex-grow: 1;
  flex-shrink: 1;
  overflow-y: auto; /* show scroll only if overflows */
  scrollbar-width: thin;

  ${disableTextSelection}
`;

const Header = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  order: 0;
  padding: 0.5rem;
`;

function ensureItemsHaveId(storedItems: StoredItemData[]): ItemData[] {
  // Sequence order will be preserved
  return storedItems.map((storedItem: StoredItemData, i: number) => {
    const item: ItemData = {
      id: Date.now() + i,
      description: storedItem.description,
      content: storedItem.content,
      index: i,
    };
    return item;
  });
}
export default function App() {
  const [items, setItems] = useState<ItemData[]>([]);
  const [lastClicked, setLastClicked] = useState<ItemId | null>(null);
  const [currentClipboard, setCurrentClipboard] = useState<string>("");

  useEffect(() => {
    console.debug("Checking if there are any items stored...");
    repository.readItems().then(storedItems => {
      console.debug("Stored items found, indexing...");
      const indexedStoredItems = ensureItemsHaveId(storedItems);
      setItems(indexedStoredItems);

      console.debug("Storing re-indexed items...");
      repository.writeItems(indexedStoredItems).then(_ => {
        console.debug("Re-indexed items stored.");
      });
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      readClipboard().then(text => {
        if (text === currentClipboard) {
          return;
        }

        setCurrentClipboard(text);

        // Clear item selection if clipboard is not aligned
        if (!!lastClicked) {
          const selectedItem = items.filter(item => item.id === lastClicked)[0];
          if (selectedItem.content !== text) {
            setLastClicked(null);
          }
        }
      });
    }, 100);
    return () => {
      clearInterval(interval);
    };
  });

  const addValue = (description: string, content: string) => {
    const maxIndex = items.length - 1;
    const newItem: ItemData = {
      id: Date.now(),
      description,
      content,
      index: maxIndex + 1,
    };
    const updatedItems: ItemData[] = [...items, newItem].sort(itemSorter);
    setItems(updatedItems);
  };

  const removeItem = (id: ItemId) => {
    console.debug(`Removing item ${id}`);
    const updatedItems: ItemData[] = items
      .filter(item => item.id !== id)
      .sort(itemSorter);

    setItems(updatedItems);
  };

  useEffect(() => {
    // back-up stored items
    repository.writeItems(items);
  }, [items]);

  return (
    <Page>
      <Header>
        <AddItemForm addItem={addValue} />
      </Header>
      <Body>
        <CopyableItems
          items={items}
          clicked={lastClicked}
          setClicked={setLastClicked}
          removeItem={removeItem}
        />
        {/* <pre>{JSON.stringify({ lastClicked, items, currentClipboard }, null, 2)}</pre> */}
      </Body>
    </Page>
  );
}
