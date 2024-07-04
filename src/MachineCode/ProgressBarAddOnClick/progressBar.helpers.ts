export const throttle = (callback: Function, maxConcurrencyAllowed: number, timeLimit: number) => {
  let numCalls = 0,
    waitingCalls = 0;
  return function (this: any, ...args: any[]) {
    if (numCalls === maxConcurrencyAllowed) {
      waitingCalls++;
      return;
    }
    numCalls++;
    callback.apply(this, args);
    const fun = () =>
      setTimeout(() => {
        numCalls--;
        if (waitingCalls > 0) {
          waitingCalls--;
          numCalls++;
          callback.apply(this, args);
          fun();
        }
      }, timeLimit);
    fun();
  };
};