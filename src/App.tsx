import React, { useState } from "react";
import styled from "styled-components";

async function copyToClipboard(content: string): Promise<void> {
  return navigator.clipboard.writeText(content);
}

type ItemId = string;
interface Item {
  id: ItemId;
  description: string;
  text: string;
}
const MOCK_VALUES: Item[] = [
  {
    id: "random-hash1",
    description: "Algo Q1",
    text: "Algo Q1 text",
  },
  {
    id: "random-hash2",
    description: "Algo Q2",
    text: "Algo Q2 text",
  },
];

const Item = styled.div`
  margin: 1rem 0.5rem;
  padding: 1rem;
  border-radius: 0.4rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #ddd;
    cursor: pointer;
  }
  &:active {
    background-color: #ccc;
    cursor: pointer;
  }
`;
const ClickedItem = styled(Item)`
  border: solid 1px rgba(0, 0, 0, 0.5);
`;
interface ClickMeButtonProps {
  item: Item;
  clicked: boolean;
  markAsLastClicked: () => void;
}
function ItemComponent({ item, clicked, markAsLastClicked }: ClickMeButtonProps) {
  const handleClick = () => {
    markAsLastClicked();
    copyToClipboard(item.text);
  };
  if (clicked) {
    return <ClickedItem onClick={() => handleClick()}>{item.description}</ClickedItem>;
  }
  return <Item onClick={() => handleClick()}>{item.description}</Item>;
}

export default function App() {
  const [values, setValues] = useState(MOCK_VALUES);
  const [lastClicked, setLastClicked] = useState<ItemId | null>(null);

  const markAsLastClicked = (valueId: ItemId) => {
    setLastClicked(valueId);
  };

  return (
    <div>
      <p>Click any below to copy them to the clipboard</p>
      {values.map(item => (
        <ItemComponent
          key={item.id}
          item={item}
          clicked={item.id === lastClicked}
          markAsLastClicked={() => markAsLastClicked(item.id)}
        />
      ))}
      <pre>{JSON.stringify({ lastClicked }, null, 2)}</pre>
    </div>
  );
}
