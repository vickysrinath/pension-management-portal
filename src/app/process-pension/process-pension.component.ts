import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, catchError } from 'rxjs';
import { pensionServiceResponse, ProcessPensionService } from './process-pension.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-pension',
  templateUrl: './process-pension.component.html',
  styleUrls: ['./process-pension.component.css']
})
export class ProcessPensionComponent implements OnInit {
  SearchForm : FormGroup;
  onSuccessSearch=false;
  error=false;
  errorMessage : string | null=null;
  message : string="";
  search: string | null=null;
  pensionServiceResponse = {} as pensionServiceResponse;
  constructor(private cookieService: CookieService,private processPensionService : ProcessPensionService) {
    this.SearchForm= new FormGroup({});
  }

  ngOnInit(): void {
    this.SearchForm=new FormGroup({
      'aadhaar' : new FormControl(null,[Validators.minLength(12),Validators.maxLength(12),Validators.required])
  })
}


  OnSearch(){
    console.log();
    this.processPensionService.processPension(this.SearchForm.get('aadhaar')?.value).subscribe(res=>{

      this.error=false;
      this.onSuccessSearch=true;
      this.pensionServiceResponse=res;
      this.pensionServiceResponse.dateOfBirth=res.dateOfBirth.substring(0,10);
      console.log(res);
    }, err=>{
      console.log(err.error.message);
      this.onSuccessSearch=false;
      this.error=true;
      this.errorMessage=err.error.message;

    });

  }


  OnReset(){
    this.onSuccessSearch=false;
  }
}
