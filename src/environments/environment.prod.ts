const BASE_URL: string = 'https://guardgatedeploy.onrender.com';

export const environment = {
  production: true,
  URL_API: `${BASE_URL}/api/v1`,
  appConfig: {
    defaultRole: 'RESIDENTE',
    defaultRoleId: '1',
  },
};
