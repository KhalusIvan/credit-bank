function throttle(func, ms) {
    let isThrottled = false,
      savedArgs,
      savedThis;
    function wrapper() {
      if (isThrottled) { // (2)
        savedArgs = arguments;
        savedThis = this;
        return;
      }
      func.apply(this, arguments); // (1)
      isThrottled = true;
      setTimeout(function() {
        isThrottled = false; // (3)
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
    return wrapper;
}
function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
      r => {
          status = "success";
          result = r;
      },
      e => {
          status = "error";
          result = e;
      }
  );
  return {
      read() {
          if (status === "pending") {
              throw suspender;
          } else if (status === "error") {
              throw result;
          } else if (status === "success") {
              return result;
          }
      }
  };
}
module.exports.throttle = throttle;
module.exports.wrapPromise = wrapPromise;