const callOnce = (fn: () => any) => {
  let hasBeenCalled: boolean = false;
  let result: any;

  return () => {
    if (!hasBeenCalled) {
      result = fn();
      hasBeenCalled = true;
    }
    return result;
  };
};

export default callOnce
