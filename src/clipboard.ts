export async function copyToClipboard(content: string): Promise<void> {
  return navigator.clipboard.writeText(content);
}
