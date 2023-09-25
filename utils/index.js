export const sleep = (time = 1) =>
  new Promise((res) => setTimeout(res, time * 1000));
