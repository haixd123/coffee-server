// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  env: 'development',
  apiUrl: 'http://localhost:8080/api/',
  firebaseConfig: {
    apiKey : "AIzaSyBYoLC0Rwo-1H0oNE5tSMw5HdnJRDuc9rg" ,
    authDomain : "coffee-80283.firebaseapp.com" ,
    projectId : "coffee-80283" ,
    storageBucket : "coffee-80283.appspot.com" ,
    messagingSenderId : "817025563986" ,
    appId : "1:817025563986:web:287c1899bfe9da531bce8b"
    // measurementId: 'G-MEASUREMENT_ID',
  }

};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
