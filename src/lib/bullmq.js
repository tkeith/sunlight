import { Queue, Worker, QueueScheduler } from 'bullmq';

export const connectionOpts = {
  connection: { host: "redis" }
};

export const getQueue = (name, opts = {}) => {
  const queue = new Queue(name, { ...connectionOpts, ...opts });
  new QueueScheduler(name, { ...connectionOpts });
  return queue;
}

export const getWorker = (name, fn, opts = {}) => {
  return new Worker(name, fn, { ...connectionOpts, ...opts });
}
