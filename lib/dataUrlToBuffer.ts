export default function dataUrlToBuffer(dataUrl: string) {
  const base64part = dataUrl.split('base64,')[1]
  return Buffer.from(base64part, 'base64')
}
