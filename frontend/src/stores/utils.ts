import axios, {AxiosError, AxiosResponse} from 'axios';


const request = async (
  type: 'delete' | 'get' | 'patch' | 'post' | 'put',
  url: string,
  data?: unknown,
  redirect?: boolean
): Promise<{err?: string, res?: AxiosResponse}> => {
  let result, req;
  switch (type) {
    case 'post':
      req = axios.post;
      break;

    case 'get':
      req = axios.get;
      break;

    case 'delete':
      req = axios.delete;
      break;

    case 'put':
      req = axios.put;
      break;

    case 'patch':
      req = axios.patch;
      break;
  }

  try {
    const accessToken = localStorage.getItem('access_token');
    const headerValue = `Bearer ${accessToken}`;
    if (type === 'get') {
      result = await req(
        url,
        {
          headers: {
          Authorization: headerValue //eslint-disable-line
          }
        }
      );
    } else {
      result = await req(
        url,
        data,
        {
          headers: {
          Authorization: headerValue //eslint-disable-line
          }
        }
      );
    }
    if (result.data instanceof Array) {
      for (let elem of result.data) {
        if (elem as Record<string, unknown> instanceof Object) {
          elem = renameProperties(elem as Record<string, unknown>);
        }
      }
    } else {
      result.data = renameProperties(result.data as Record<string, unknown>);
    }


    return {res: result};
  } catch (e: unknown) {
    result = e as AxiosError;
    if (result.isAxiosError) {
      if (result.request.status === 401) {
        if (redirect)
          window.location.pathname = '/auth';
        throw new Error('Not authenticated');
      } else {
        return {err: result.response?.data.detail};
      }
    } else {
      return {err: 'Произошла ошибка при отправке запроса'};
    }
  }
};

function renameProperties (obj: Record<string, unknown>): Record<string, unknown> {
  const niceNamedObj: Record<string, unknown> = {};


  for (const prop in obj) {
    if (obj[prop] instanceof Array) {
      const newObjs = [];
      for (let elem of obj[prop] as unknown[]) {
        if (elem instanceof Object) {
          elem = renameProperties(elem as Record<string, unknown>);
          newObjs.push(elem);
        } else {
          newObjs.push(elem);
        }
      }
      obj[prop] = newObjs;
    } else if (obj[prop] instanceof Object) {
      obj[prop] = renameProperties(obj[prop] as Record<string, unknown>);
    }

    const propArr = [];
    let nextUpper = false;
    for (const letter of prop) {
      if (letter === '_') {
        nextUpper = true;
        continue;
      }
      if (nextUpper) {
        propArr.push(letter.toUpperCase());
        nextUpper = false;
        continue;
      }

      propArr.push(letter);
    }
    niceNamedObj[propArr.join('')] = obj[prop];
  }

  return niceNamedObj;

}


export default request;