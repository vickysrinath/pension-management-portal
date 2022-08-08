import { globalConstants } from './../common/global-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface  pensionServiceResponse{
  name : string,
  dateOfBirth: string,
  pan : string,
  pensionType : string,
  pensionAmount : number

}



@Injectable({
  providedIn: 'root'
})
export class ProcessPensionService {

  constructor(private http: HttpClient) { }

  processPension(aadhaarNumber : String){
    return this.http.post<pensionServiceResponse>(globalConstants.processPensionUrl+'processPension',{'aadhaarNumber' : aadhaarNumber});
  }
}
