// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: 'v8.0.38',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  authApiUrl: 'https://test.indana.io/api/auth',
  workspaceApiUrl: 'https://test.indana.io/api/workspace',
  itemApiUrl: 'https://test.indana.io/api/item',
  campaignApiUrl: 'https://test.indana.io/api/campaign',
  conversionApiUrl: 'https://test.indana.io/api/conversion',
  campaignAggregatorUrl: 'https://test.indana.io/api/campaign-ag',
  promoterApiUrl: 'https://test.indana.io/api/promoter',
  affiliateApiUrl: 'https://test.indana.io/api/affiliate',
  WalletApiUrl: 'https://test.indana.io/api/wallet',
  integrationApiUrl: 'https://test.indana.io/api/integration',
  insightsApiUrl: 'https://test.indana.io/api/insight',
  integrationCallbackUrl: 'http://localhost:4200/settings/resync-store',

  userManagemntUrl: 'http://localhost:5321/api/UserManagement',
  stateMangementSecretKey: '123asdzxc',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
