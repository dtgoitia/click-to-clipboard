import React from "react";
import styled from "styled-components";

import { copyToClipboard } from "../clipboard";
import { ItemData, ItemId } from "../domain";

const Item = styled.div`
  margin: 1rem 0.5rem;
  border-radius: 0.4rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

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
const DeleteButton = styled.div`
  order: 0;
  flex-grow: 0;
  flex-shrink: 0;

  padding: 1rem;

  background-color: rgba(255, 0, 0, 0.3);
  &:hover {
    background-color: rgba(255, 0, 0, 0.5);
  }
  &:active {
    background-color: rgba(255, 0, 0, 0.8);
  }
`;
const ItemText = styled.div`
  order: 1;
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

const Container = styled.div`
  padding: 0.5rem;
`;
const ItemList = styled.div``;

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
    return <p>Add an item below :)</p>;
  }
  return (
    <Container>
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
    </Container>
  );
}
