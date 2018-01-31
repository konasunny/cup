import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { LocationsModel } from '../models/locationModel';

@Injectable()
export class TechniciansLocationService extends WebService<LocationsModel[]> {

  public getTechniciansLocations() {
    return this.get({
      url: './assets/tech-locations.json'
    });
  }
}
