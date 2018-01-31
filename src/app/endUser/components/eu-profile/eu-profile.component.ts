import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { UserprofileService } from '../../services/userprofile.service';
import { UserProfile } from '../../models/userprofile';

@Component({
  selector: 'cupcake-eu-profile',
  templateUrl: './eu-profile.component.html',
  styleUrls: ['./eu-profile.component.scss']
})
export class EuProfileComponent implements OnInit {
    
  userprofileData: any;

  constructor(private userProfileService: UserprofileService) { }

  ngOnInit() {
    this.getUserProfile();
  }
  getUserProfile() {
    const params = { userType: 1 }; // TODO: will be deleted once the actual service is ready

    this.userProfileService.getUserProfile(params).subscribe(userProfile => {      
      this.userprofileData = userProfile;    
    },
      err => {
        console.error(err);
      });
  }
   copyAddress(obj: any){    
    //return Object.assign({}, this.userprofileData);
   }

}

