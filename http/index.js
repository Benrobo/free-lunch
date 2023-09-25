import $http from "./axios";

export const createOrganizationAccount = async (data) => {
  try {
    const res = await $http.post("/auth/signup", data);
    return res?.data ?? res?.response?.data;
  } catch (e) {
    return e.response?.data ?? { message: e.message, code: e?.code };
  }
};

export const login = async (data) => {
  try {
    const res = await $http.post("/auth/login", data);
    return res?.data ?? res?.response?.data;
  } catch (e) {
    return e.response?.data ?? { message: e.message, code: e?.code };
  }
};
