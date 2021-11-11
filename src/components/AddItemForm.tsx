import React from "react";
import { useState } from "react";
import { Button, InputOnChangeData, Form } from "semantic-ui-react";
import styled from "styled-components";

const EMPTY_FIELD = "";

const Container = styled.div`
  order: 1000;
  border: 1px black solid;
  padding: 0.5rem;
`;
interface AddItemFormProps {
  addItem: (description: string, content: string) => void;
}

const AddItemForm = ({ addItem }: AddItemFormProps) => {
  const [description, setDescription] = useState<string>(EMPTY_FIELD);
  const [content, setContent] = useState<string>(EMPTY_FIELD);

  const handleSubmit = () => {
    addItem(description, content);

    setDescription(EMPTY_FIELD);
    setContent(EMPTY_FIELD);
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
