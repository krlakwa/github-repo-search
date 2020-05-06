export function suspensify(promise) {
  let status = 'pending';
  let result;
  const suspender = promise.then(
    response => {
      status = 'success';
      result = response;
    },
    error => {
      status = 'error';
      result = error;
    }
  );
  return {
    read() {
      if (status === 'pending') throw suspender;

      if (status === 'error') throw result;
      return result;
    },
  };
}

export async function fetchResource(url, opts = {}) {
  try {
    return await fetch(url, { ...opts });
  } catch (err) {
    // eslint-disable-next-line no-console
    return console.log('Err', err.message);
  }
}

export function abortableFetch(request, opts) {
  const controller = new AbortController();
  const cSignal = controller.signal;

  return {
    abort: () => controller.abort(),
    ready: fetch(request, { ...opts, signal: cSignal }),
  };
}
