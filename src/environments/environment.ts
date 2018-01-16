// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD5uzBgWv1ofOuruA6PmoT80rnLnatJHPg',
    authDomain: 'https://epic-neumann-602311.netlify.com/',
    databaseURL: 'https://cupcake-geolocaltion.firebaseio.com/',
    projectId: 'cupcake-geolocaltion',
    storageBucket: 'gs://cupcake-geolocaltion.appspot.com/'
  }
};
