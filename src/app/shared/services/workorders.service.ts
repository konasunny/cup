import { Injectable } from '@angular/core';
import { WebService } from '../../shared/services/web.service';
import { Workorders } from '../models/workorders';


@Injectable()
export class WorkordersService extends WebService<Workorders[]> {

  getWorkorders(params) {
    return this.get({
      url: './assets/workorders.json',
      params: {
        userType: params.userType
      }
    });
  }
}
