import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


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
    return this.http.post<pensionServiceResponse>(environment.processPensionUrl+'processPension',{'aadhaarNumber' : aadhaarNumber});
  }
}
