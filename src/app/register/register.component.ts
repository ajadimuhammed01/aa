import { Component, OnInit, ViewChild, ViewChildren,  TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  constructor(
        private acct: AccountService,
        private router: Router,
        private fb: FormBuilder,
        private modalService: BsModalService      
  ) { }
  
  //Properties
  insertForms: FormGroup;
  Username: FormControl;
  Password: FormControl;
  cpassword: FormControl;
  email: FormControl;
  modalRef: BsModalRef;
  errorList: string[];
  modalMessage: string;
  invalidRegister: boolean;
  
  @ViewChild('template', {static:true}) modal : TemplateRef<any>;
  
  onSubmit()
  {

    

    let userDetails = this.insertForms.value;
    console.log(userDetails);

    this.acct.register(userDetails.username, userDetails.password, userDetails.email).subscribe(result => {
      this.invalidRegister = true;
      this.router.navigate(['/login']);
    }, error =>
    {
      this.errorList = [];
      
      for(var i = 0; i < error.error.value.length; i++)
      {
        this.errorList.push(error.error.value[i]);
      }
      console.log(error)
      this.modalMessage = "Your Registration was Unsuccessful";
      this.modalRef = this.modalService.show(this.modal)
    });

  }

  //Custom Validator
  MustWatch(passwordControl: AbstractControl): ValidatorFn
  {
      return (cpasswordControl: AbstractControl) : {[Key: string] : boolean} | null  =>
      {
        // return null if controls havent initialised yet
        if(!passwordControl && !cpasswordControl)
        {
          return null;
        }
        // return null if another validator has already found an error on the matchingControl
        if(cpasswordControl.hasError && !passwordControl.hasError)
        {
          return null;
        }
        //set error on matchingControl if validation false
        if(passwordControl.value !== cpasswordControl.value)
        {
           return {'mustMatch': true}
        }
        else {
          return null;
        }
      }
  }

  ngOnInit() {

    
    this.Username = new FormControl('', [Validators.required, Validators.maxLength[10], Validators.minLength[5]]);
    this.Password = new FormControl('', [Validators.required, Validators.maxLength[10], Validators.minLength[5]]);
   // this.cpassword = new FormControl('', [Validators.required, this.MustWatch(this.password)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.errorList = [];

    this.insertForms = this.fb.group({
      'Username': this.Username,
      'Password': this.Password,
      'cpassword': this.cpassword,  
      'email': this.email
    });
         
  }
  

}
