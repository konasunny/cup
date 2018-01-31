import { Injectable, Optional } from '@angular/core';

export class ApiConfig {
  constructor(public apiKey: string){}
}

@Injectable()
export class MapsApiLoaderService {

  private _config: ApiConfig;
  private _apiLoadingPromise: Promise<any>;

  constructor( @Optional() config: ApiConfig) {
    this._config = config;
    if (!this.isApiLoaded()) {
      this.loadApi()
      this._apiLoadingPromise.then(() => { console.log('done') });
    }
  }

  private _loadScript(): void {
    let script = (<any>document).createElement('script');
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?callback=__onGoogleLoadedkey=AIzaSyDE9EQtwwKNgeES-_jGLXGJIF9agJEBi6E&libraries=geometry`;
    script.type = 'text/javascript';

    (<any>document).getElementsByTagName('head')[0].appendChild(script);
  }

  isApiLoaded(): boolean {
    return (<any>window).google ? true : false;
  }

  loadApi(): void {
    if (!this._apiLoadingPromise) {
      this._apiLoadingPromise = new Promise((resolve) => {
        (<any>window)['__onGoogleLoaded'] = (ev) => {
          console.log('google maps api loaded');
          resolve('google maps api loaded');
        }

        this._loadScript();
      })
    }
  }
}
