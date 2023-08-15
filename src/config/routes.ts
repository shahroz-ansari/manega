const routes = {
  dashboard: '/dashboard',
  expertProfile: '/dashboard/expert/profile/:profileId',
  playerProfile: '/dashboard/player/profile/:profileId',
};

export const generateRoute = (
  route: string,
  values?: { [key: string]: string }
) => {
  let path = route;
  if (values) {
    Object.keys(values).forEach((key) => {
      path = path.replace(`/:${key}`, `/${values[key]}`);
    });
  }
  return path;
};

export default routes;
