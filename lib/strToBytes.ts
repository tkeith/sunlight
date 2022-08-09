export function strToBytes(str: string): Uint8Array {
  return (new TextEncoder()).encode(str);
}
