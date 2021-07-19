const fnWithRetries = async (fn, params, retries = 10) => {
  for (let attempt = 1; attempt < retries; attempt++) {
    try {
      if (debug) console.log(`Attempt ${attempt}`);
      return params ? await fn(...params) : await fn();
    } catch (exception) {
      continue;
    }
  }
  // If outside of the loop and it has not returned, this is the final attempt
  if (debug) console.log(`Final attempt`);
  return params ? await fn(...params) : await fn();
};

module.exports = fnWithRetries;
