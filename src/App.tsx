import React, { useState } from "react";

async function copyToClipboard(content: string): Promise<void> {
  return navigator.clipboard.writeText(content);
}

const MOCK_VALUES = ["text 1", "text 2 with more stuff"];

interface ClickMeButtonProps {
  text: string;
}
function ClickMeButton({ text }: ClickMeButtonProps) {
  return <div onClick={() => copyToClipboard(text)}>Click me to copy "{text}"</div>;
}

export default function App() {
  const [values, setValues] = useState(MOCK_VALUES);

  return (
    <div>
      <p>Click any below to copy them to the clipboard</p>
      {values.map((text, i) => (
        <ClickMeButton key={i} text={text} />
      ))}
    </div>
  );
}
