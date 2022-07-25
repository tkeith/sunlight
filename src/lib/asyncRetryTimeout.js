const asyncRetryTimeout = async (timeout, delayBetween, fn) => {
  const startTime = (new Date()).getTime();
  while (true) {
    let res;
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
