import React, { useState } from "react";
import styled from "styled-components";

import AddItemForm from "./components/AddItemForm";
import CopyableItems from "./components/CopyableItems";
import { ItemData, ItemId } from "./domain";

const MOCK_DATA: ItemData[] = [
  {
    id: "random-hash1",
    description: "Algo Q1",
    content: "Algo Q1 text",
    index: 1,
  },
  {
    id: "random-hash2",
    description: "Algo Q2",
    content: "Algo Q2 text",
    index: 0,
  },
];

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
  const [items, setItems] = useState([]);
  const [lastClicked, setLastClicked] = useState<ItemId | null>(null);

  const addValue = (description: string, content: string) => {
    const timestamp = new Date().toISOString();
    const maxIndex = items.length - 1;
    const newItem: ItemData = {
      id: timestamp,
      description,
      content,
      index: maxIndex + 1,
    };
    const updatedValues: ItemData[] = [...items, newItem];
    setItems(updatedValues);
  };

  const itemsSortedByIndex = items.concat().sort(itemSorter);

  return (
    <Page>
      <Body>
        <p>Click any below to copy them to the clipboard</p>
        <CopyableItems
          items={itemsSortedByIndex}
          clicked={lastClicked}
          setClicked={id => setLastClicked(id)}
        />
        {/* <pre>{JSON.stringify({ lastClicked, items }, null, 2)}</pre> */}
      </Body>
      <Footer>
        <AddItemForm addItem={addValue} />
      </Footer>
    </Page>
  );
}
