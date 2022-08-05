import { Queue, Worker, QueueScheduler, Processor } from 'bullmq'

export const connectionOpts = {
  connection: { host: "redis" }
};

export const getQueue = (name: string, opts = {}) => {
  const queue = new Queue(name, { ...connectionOpts, ...opts });
  new QueueScheduler(name, { ...connectionOpts });
  return queue;
}

export const getWorker = (name: string, fn: Processor<any, any, string>, opts = {}) => {
  return new Worker(name, fn, { ...connectionOpts, ...opts });
}
