import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { readClipboard } from "./clipboard";
import AddItemForm from "./components/AddItemForm";
import CopyableItems from "./components/CopyableItems";
import { ItemData, ItemId } from "./domain";
import repository from "./persistence";

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

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;

  /* to occupy the whole space */
  width: 100%;
  height: 100vh;
`;

const Body = styled.div`
  order: 0;
  flex-grow: 1;
  flex-shrink: 1;
  overflow-y: scroll;
  scrollbar-width: thin;
`;

const Footer = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  order: 1;
`;

export default function App() {
  const [items, setItems] = useState<ItemData[]>([]);
  const [lastClicked, setLastClicked] = useState<ItemId | null>(null);
  const [currentClipboard, setCurrentClipboard] = useState<string>("");

  useEffect(() => {
    repository.readItems().then(storedItems => {
      setItems(storedItems);
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
      <Body>
        <p>Click any below to copy them to the clipboard</p>
        <CopyableItems
          items={items}
          clicked={lastClicked}
          setClicked={setLastClicked}
          removeItem={removeItem}
        />
        <pre>{JSON.stringify({ lastClicked, items, currentClipboard }, null, 2)}</pre>
      </Body>
      <Footer>
        <AddItemForm addItem={addValue} />
      </Footer>
    </Page>
  );
}
