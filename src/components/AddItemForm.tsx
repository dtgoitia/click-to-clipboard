import React from "react";
import { useState } from "react";
import { Button, InputOnChangeData, Form } from "semantic-ui-react";
import styled from "styled-components";

import { disableTextSelection } from "../style";
import AddIcon from "./AddIcon";

const EMPTY_FIELD = "";

const Container = styled.div`
  & input {
    width: calc(100% - 0.5rem);
  }
`;
interface AddItemFormProps {
  addItem: (description: string, content: string) => void;
}

const IconContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  padding-top: 0.5rem;

  & svg {
    fill: rgba(255, 255, 255, 0.3);
  }

  & svg:hover,
  & svg:active {
    cursor: pointer;
    fill: rgba(255, 255, 255, 0.5);
  }

  ${disableTextSelection}
`;

const AddItemForm = ({ addItem }: AddItemFormProps) => {
  const [unfolded, unfold] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(EMPTY_FIELD);
  const [content, setContent] = useState<string>(EMPTY_FIELD);

  if (!unfolded) {
    return (
      <IconContainer onClick={() => unfold(!unfolded)}>
        <AddIcon />
      </IconContainer>
    );
  }

  const handleSubmit = () => {
    addItem(description, content);

    setDescription(EMPTY_FIELD);
    setContent(EMPTY_FIELD);
    unfold(false);
  };

  const handleChange = (_: any, { name, value }: InputOnChangeData): void => {
    switch (name) {
      case "description":
        setDescription(value);
        break;
      case "content":
        setContent(value);
        break;
    }
  };

  return (
    <Container>
      <Form onSubmit={() => handleSubmit()}>
        <Form.Field>
          <Form.Input
            placeholder="description"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            placeholder="content"
            name="content"
            value={content}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field control={Button}>Add item</Form.Field>
      </Form>
    </Container>
  );
};

export default AddItemForm;
