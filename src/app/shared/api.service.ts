import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postEmploye(data : any){
    return this.http.post<any>("https://tialao-angular-crud.herokuapp.com/posts", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmploye(){
    return this.http.get<any>("https://tialao-angular-crud.herokuapp.com/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateEmploye(data : any,id: number){
    return this.http.put<any>("https://tialao-angular-crud.herokuapp.com/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEmployee(id : number){
    return this.http.delete<any>("https://tialao-angular-crud.herokuapp.com/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  
  
}
