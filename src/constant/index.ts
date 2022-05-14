let globalUser: any = null;

export const setGlobalUser = (user: any) => {
  globalUser = user;
};

export const getGlobalUser = () => {
  return globalUser;
};
