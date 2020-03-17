// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  BaseUrl: 'http://localhost:49798/api/',

  firebase: {
    apiKey: "AIzaSyBUdNtjfgmh-N-yOWx_kuF8dbdzN_7a1Aw",
    authDomain: "fundoonotes-1580121043579.firebaseapp.com",
    databaseURL: "https://fundoonotes-1580121043579.firebaseio.com",
    projectId: "fundoonotes-1580121043579",
    storageBucket: "fundoonotes-1580121043579.appspot.com",
    messagingSenderId: "670336277527",
    appId: "1:670336277527:web:65c5dead7c2187ccae9052",
    measurementId: "G-CDEEVQX2ER"
  }

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
