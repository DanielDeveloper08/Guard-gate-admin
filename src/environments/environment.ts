const BASE_URL: string = 'https://guardgatedeploy.onrender.com';

export const environment = {
  production: false,
  URL_API: `${BASE_URL}/api/v1`,
  appConfig: {
    defaultRole: 'RESIDENTE',
    defaultRoleId: '1',
  },
};
