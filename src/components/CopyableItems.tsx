import React from "react";
import styled from "styled-components";

import { copyToClipboard } from "../clipboard";
import { ItemData, ItemId } from "../domain";

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
  item: ItemData;
  clicked: boolean;
  markAsLastClicked: () => void;
}
function ItemComponent({ item, clicked, markAsLastClicked }: ClickMeButtonProps) {
  const handleClick = () => {
    markAsLastClicked();
    copyToClipboard(item.content);
  };
  if (clicked) {
    return <ClickedItem onClick={() => handleClick()}>{item.description}</ClickedItem>;
  }
  return <Item onClick={() => handleClick()}>{item.description}</Item>;
}

const Container = styled.div`
  padding: 0.5rem;
`;
const ItemList = styled.div``;

interface CopyableItemsProps {
  items: ItemData[];
  clicked: ItemId;
  setClicked: (id: ItemId) => void;
}
export default function CopyableItems({
  items,
  clicked,
  setClicked,
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
          />
        ))}
      </ItemList>
    </Container>
  );
}
