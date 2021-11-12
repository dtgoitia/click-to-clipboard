import { isFirefox } from "./browserApi";

export async function copyToClipboard(content: string): Promise<void> {
  // Requires "clipboardWrite" permission
  return navigator.clipboard.writeText(content);
}

export async function readClipboard(): Promise<string> {
  if (!document.hasFocus()) {
    // The Clipboard API only works if `Document` is focused.
    return;
  }

  if (isFirefox) {
    return Promise.resolve("Firefox does not support read clipboard API yet");
  }

  // Requires "clipboardRead" permission
  return navigator.clipboard.readText();
}
