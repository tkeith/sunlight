const callOnce = (fn) => {
  let hasBeenCalled = false;
  let result;

  return () => {
    if (!hasBeenCalled) {
      result = fn();
      hasBeenCalled = true;
    }
    return result;
  };
};

export default callOnce
