import axios from 'axios';


const request = async (type: string, url: string, data?: Record<string, unknown>): Promise<unknown> => {
  let result;
  switch (type) {
    case 'post':
      try {
        result = await axios.post(
          url,
          data
        );

      } catch (e: unknown) {
        result = e;
      }

      return result;
  }
};

export default request;