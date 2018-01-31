import {
  NgModule,
  Pipe,
  OnInit,
  Component
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import 'rxjs/add/observable/of';

@Component({
  selector: 'cupcake-techprofile',
  templateUrl: './techprofile.component.html',
  styleUrls: ['./techprofile.component.scss']
})
export class TechprofileComponent implements OnInit {
  form: FormGroup;

  technicianskills: string[] = [
    'Electrician',
    'Plumber',
    'Tile',
    'Roof',
    'Dig',
    'Pumps'
  ];
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii'    
  ];
  myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phoneNumber: FormControl;
  drivingLicense: FormControl;
  streetOne: FormControl;
  streetTwo: FormControl;
  technicianskill: FormControl;
  state: FormControl;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, Validators.required],
    });
  
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      // Validators.pattern('[^ @]*@[^ @]*')
      Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
    ]);
    this.phoneNumber = new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]);
    this.drivingLicense = new FormControl('', Validators.required);    
    this.streetOne = new FormControl('', Validators.required);
    this.streetTwo = new FormControl('', Validators.required);
    this.technicianskill = new FormControl('');
    this.state = new FormControl('');
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      email: this.email,
      phoneNumber: this.phoneNumber,
      drivingLicense: this.drivingLicense,
      streetOne: this.streetOne,
      streetTwo: this.streetTwo,
      technicianskill: this.technicianskill,
      state: this.state
    });
  }

  changed(e){
    //event comes as parameter, you'll have to find selectedData manually
    //by using e.target.data
    console.log(e.target.data);
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log('Form Submitted!');
      this.myform.reset();
    } else {
      console.log(this.myform.value);
    }
    this.bsModalRef.hide();
  }


  
}
