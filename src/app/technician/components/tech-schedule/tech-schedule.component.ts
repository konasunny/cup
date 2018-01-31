import { Component, OnInit, ChangeDetectionStrategy, ViewChild   } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { TabsetComponent } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';

@Component({
  selector: 'cupcake-tech-schedule',
  templateUrl: './tech-schedule.component.html',
  styleUrls: ['./tech-schedule.component.scss']
})
export class TechScheduleComponent implements OnInit {
  @ViewChild('scheduleTabs') scheduleTabs: TabsetComponent;
  weather: Object;
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
  constructor(private http: HttpClient) {}
  
  tabs: any[] = [
    { title: 'Sunday', content: [
      {contenttime: '7 - 8 am', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '3 - 6 am', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '1 - 4 pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'}
    ]},
    { title: 'Monday', content: [
      {contenttime: '3Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '4Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '8Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '4Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '1Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'}
    ]},
    { title: 'Tuesday', content: [
      {contenttime: '4Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'}
    ]},
    { title: 'Wednesday', content: [
      {contenttime: '5Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '4Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '7Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'}
    ]},
    { title: 'Thursday', content: [
      {contenttime: '1Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '2Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '3Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '4Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '5Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '6Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '7Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'}
    ]},
    { title: 'Friday', content: [
      {contenttime: '7Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '7Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '7Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '7Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'}
    ]},
    { title: 'Saturday', content: [
      {contenttime: '7Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'},
      {contenttime: '7Am to 8Pm', contenttitle: 'Pump Repair', contentaddress: '8095 Main st, Frisco, TX'}
    ]}
  ];
  selectTab(tab_id: number) {
    this.scheduleTabs.tabs[tab_id].active = true;
  }
  addNewTab(): void {
    const newTabIndex = this.tabs.length + 1;
    this.tabs.push({
      title: `Dynamic Title ${newTabIndex}`,
      content: `Dynamic content ${newTabIndex}`,
      disabled: false,
      removable: true
    });
  }

  ngOnInit() {
    let city: string = "Houston";
    let searchtext: string = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c'";
        
    this.http.get("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json").subscribe(data => {
      this.weather = data;
    });
  }
  

}
