import React from "react";
import styled from "styled-components";

import { copyToClipboard } from "../clipboard";
import { ItemData, ItemId } from "../domain";

const highlighted = "#ddd";

const Item = styled.div`
  border-radius: 0.4rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
  background-color: white;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  &:hover {
    background-color: ${highlighted};
    cursor: pointer;
  }
  &:active {
    background-color: #aaa;
    cursor: pointer;
  }
`;
const ClickedItem = styled(Item)`
  background-color: ${highlighted};
`;
const DeleteButton = styled.div`
  order: 1;
  flex-grow: 0;
  flex-shrink: 0;

  padding: 0.5rem;

  background-color: rgba(255, 0, 0, 0.3);
  &:hover {
    background-color: rgba(255, 0, 0, 0.5);
  }
  &:active {
    background-color: rgba(255, 0, 0, 0.8);
  }
`;
const ItemText = styled.div`
  order: 0;
  flex-grow: 1;
  flex-shrink: 1;

  padding: 1rem;
`;

interface ItemComponentProps {
  item: ItemData;
  clicked: boolean;
  markAsLastClicked: () => void;
  removeItem: () => void;
}
function ItemComponent({
  item,
  clicked,
  markAsLastClicked,
  removeItem,
}: ItemComponentProps) {
  const handleClick = () => {
    markAsLastClicked();
    copyToClipboard(item.content);
  };

  const itemComponents = [
    <DeleteButton onClick={removeItem}>&nbsp;</DeleteButton>,
    <ItemText onClick={() => handleClick()}>{item.description}</ItemText>,
  ];

  if (clicked) {
    return <ClickedItem>{...itemComponents}</ClickedItem>;
  }

  return <Item>{...itemComponents}</Item>;
}

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  row-gap: 0.5rem;

  padding: 0.5rem;
`;

const Hint = styled.div`
  color: white;
  padding: 0.5rem;
  text-align: center;
`;

interface CopyableItemsProps {
  items: ItemData[];
  clicked: ItemId;
  setClicked: (id: ItemId) => void;
  removeItem: (id: ItemId) => void;
}
export default function CopyableItems({
  items,
  clicked,
  setClicked,
  removeItem,
}: CopyableItemsProps) {
  if (items.length === 0) {
    return (
      <Hint>
        Hit
        <br />
        <b>+</b>
        <br /> to add
        <br /> an item
        <br /> :)
      </Hint>
    );
  }
  return (
    <ItemList>
      {items.map(item => (
        <ItemComponent
          key={item.id}
          item={item}
          clicked={item.id === clicked}
          markAsLastClicked={() => setClicked(item.id)}
          removeItem={() => removeItem(item.id)}
        />
      ))}
    </ItemList>
  );
}
