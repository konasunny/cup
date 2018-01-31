import { Component, OnInit } from '@angular/core';
import { WorkordersService } from '../../../shared/services/workorders.service';

@Component({
  selector: 'cupcake-workorders',
  templateUrl: './workorders.component.html',
  styleUrls: ['./workorders.component.scss']
})
export class WorkordersComponent implements OnInit {
  workordersList: any[] = [];

  constructor(private workordersService: WorkordersService) { }

  ngOnInit() {
    const params = {userType: 1};
    // TODO: will be deleted once the actual service is ready

    this.workordersService.getWorkorders(params).subscribe(workorders => {
      console.log(workorders);
      // TODO: this is just for reference, will be removed once we integrate with actual data
      this.workordersList = workorders;
    },
    err => {
      console.error(err);
    });
  }

}
