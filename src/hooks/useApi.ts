import * as api from "../services/fakeApi";

export const useApi = () => {
  const callApi = async (action: string, config?: any) => {
    try {
      // @ts-ignore
      const res = await api[action](config);
      return res;
    } catch (err) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  };

  return { callApi };
};