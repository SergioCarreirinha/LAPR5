// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapbox: {accesstoken:'pk.eyJ1IjoiY3VuaGFhcyIsImEiOiJja2k0eXFsaDEwMXFvMnJucTlzOTE4bjk3In0.1BWcHMvsWG8bpgOSa2LNng'},
  url: {mdr: 'https://mdr25.azurewebsites.net/', mdv:'https://mdv-g25.azurewebsites.net/', prolog:'http://40.68.185.247:80/api/genetics'},
  testing: {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI2MGVhZjc4Yi03MDRjLTQ4ZTYtOGY0MC1iNjJmZjYxYTU1NTYiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MTE0MTI3OTgsImV4cCI6MTYxMTQ5OTE5OCwiaWF0IjoxNjExNDEyNzk4fQ.04YVKlnAuMZpnbywLc-V3XgxO_bvYFMb2_F1W-4BlKI'}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
