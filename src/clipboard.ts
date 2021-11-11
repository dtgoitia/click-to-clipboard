export async function copyToClipboard(content: string): Promise<void> {
  // Requires "clipboardWrite" permission
  return navigator.clipboard.writeText(content);
}

export async function readClipboard(): Promise<string> {
  // Requires "clipboardRead" permission
  return navigator.clipboard.readText();
}
