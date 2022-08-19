import { Readable, Writable } from 'stream'
import getDb from './getDb'
import mongodb, { GridFSBucket } from 'mongodb'
import callOnce from "./callOnce"
import { z } from 'zod'

export const Base64FileDataWithMime = z.union([
  z.object({
    mime: z.string(),
    data: z.string(),
  }),
  z.object({
    dataUri: z.string(),
  }),
])

export type Base64FileDataWithMime = z.infer<typeof Base64FileDataWithMime>

export const getGridFsBucket: () => Promise<GridFSBucket> = callOnce(async function () {
  const bucket = new GridFSBucket(await getDb())
  return bucket
});

export async function saveBufferOrString(filename: string, content: string | Buffer, metadata: any | null = null) {
  await deleteByFilename(filename)
  const grid = await getGridFsBucket()
  await Readable.from(content).pipe(grid.openUploadStream(filename, { metadata: metadata }))
}

export async function saveBase64DataWithMime(filename: string, fileData: Base64FileDataWithMime) {
  let base64Data: string
  let mime: string
  if ("dataUri" in fileData) {
    [mime, base64Data] = fileData.dataUri.split('data:')[1].split(';base64,')
  } else {
    mime = fileData.mime
    base64Data = fileData.data
  }

  const dataBuffer = Buffer.from(base64Data, 'base64')

  return await saveBufferOrString(filename, dataBuffer, { mime: mime })
}

export async function getString(filename: string) {
  const grid = await getGridFsBucket()
  return await new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const s = new Writable({
      write(chunk, encoding, callback) {
        chunks.push(chunk)
        callback();
      }
    });
    s.on('finish', function () {
      const res = chunks.join()
      resolve(res)
    })
    grid.openDownloadStreamByName(filename).pipe(s)
  })
}

export async function getMetadata(filename: string) {
  const db = await getDb()
  return (await db.collection('fs.files').findOne({filename: filename}))?.metadata
}

export async function deleteByFilename(filename: string) {
  const grid = await getGridFsBucket()
  const db = await getDb()
  const filesColl = db.collection('fs.files')
  for (const file of (await filesColl.find({ filename: filename }).toArray())) {
    await grid.delete(file._id)
  }
}
