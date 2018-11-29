// import fetch from 'dva/fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function request(url, options) {
  const response = await fetch(url, options);
  checkStatus(response);
  return await response.json();
}

export async function post(url, payload, options) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            todo: payload.todo,
            priority: payload.priority,
            status: payload.status,
            expired_at: payload.expired_at
        }, options)
    });
    checkStatus(response);
    return await response.json();
}

export async function update(url, payload, options) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: payload.id,
            todo: payload.todo,
            priority: payload.priority,
            status: payload.status,
            expired_at: payload.expired_at
        }, options)
    });
    checkStatus(response);
    return await response.json();
}