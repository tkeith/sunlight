const asyncRetryTimeout = async (timeout: number, delayBetween: number, fn: () => any) => {
  const startTime = (new Date()).getTime();
  while (true) {
    let res: any;
    try {
      res = await fn();
      return res;
    } catch (err) {
      if ((new Date()).getTime() + delayBetween > startTime + timeout) {
        // timeout exceeded
        throw err;
      }
      // wait and try again
      await new Promise(r => setTimeout(r, delayBetween))
    }
  }
}

export default asyncRetryTimeout;
