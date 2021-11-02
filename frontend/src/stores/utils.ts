import axios, {AxiosError, AxiosResponse} from 'axios';


const request = async (
  type: 'delete' | 'get' | 'patch' | 'post' | 'put',
  url: string, data?: unknown
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
    const authHeader = accessToken ? `Bearer ${accessToken}` : '';
    result = await req(
      url,
      data,
      {headers: {
        Authorization: authHeader
      }}
    );

    return {res: result};
  } catch (e: unknown) {
    result = e as AxiosError;
    if (result.isAxiosError) {
      if (result.request.status === 401) {
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

export default request;