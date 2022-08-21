import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/auth/shared/auth.service';
import { SignupRequestPayload } from '../signup-request-payload';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { NgModule } from '@angular/core';
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModal {
  closeResult = '';
  signupRequestPayload: SignupRequestPayload | any;
  signupForm: FormGroup | any;
  radioValue : boolean = false;
  selectedRole : String = "student";
  committees: any;
  select : any;

  constructor(private modalService: NgbModal,private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.signupRequestPayload = {
      rollNo: '',
      name: '',
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      rollNo: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.getDropDown();
  }



  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getDropDown()
  {
    this.authService.getDropDown().subscribe(data =>{
      this.committees = [...data];
    });
  }

  toggleDropdown(flag:number)
  {
    if (flag == 0)
    {
      this.radioValue = true;
      this.selectedRole = "committee";
    }
    else if (flag == 1)
    {
      this.radioValue = false;
      this.selectedRole = "student";
    }
    else console.log("radio button error");
  }

  tester()
  {
    this.select = document.getElementById('select')
    this.signupRequestPayload.rollNo = "Committee"
    this.signupRequestPayload.name = this.select.value;
    console.log(this.select.value);
  }


  signup() {

    if(this.radioValue==true)//committee
    {
      this.tester();
    }
    else
    {
      this.signupRequestPayload.rollNo = this.signupForm.get('rollNo').value;
      this.signupRequestPayload.name = this.signupForm.get('name').value;
    }
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.role = this.selectedRole;

    this.authService.signup(this.signupRequestPayload)
      .subscribe( () => {
        this.router.navigate(['/login'],
          {queryParams: {registered: true}});
      }, () =>{
        this.toastr.error("Registration failed! Please try again");
      });

  }
}
