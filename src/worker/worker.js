import { getWorker } from "../lib/bullmq.js";
import getDb from "../lib/getDb.js";

getWorker('exampleSaveTextQueue', async job => {
  const newText = job.data.newText;
  console.log('saving new text: ', newText);
  (await getDb()).collection('example').updateOne(
    {},
    { $set: { text: newText } },
    { upsert: true, });
});

setInterval(() => {
  console.log('hello from worker')
}, 600000);
