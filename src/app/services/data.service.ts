import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUsername=""
  currentAcno=""
  data: any = {
    1000: { acno: 1000, uname: "Neer", password: "1000", balance: 5000,transaction:[] },
    1001: { acno: 1001, uname: "Ravi", password: "1001", balance: 4000,transaction:[] },
    1002: { acno: 1002, uname: "Ram", password: "1002", balance: 6000,transaction:[] }
  }

  constructor(private http:HttpClient) {
    // this.getDetails()
   }
   getTransaction(acno:any){
    const data={
      acno
     
    }
    
    // server call
   return this.http.post('http://localhost:3000/getTransaction',data,this.getOptions())
   }

  saveDetails(){
    if(this.data){
      localStorage.setItem("data",JSON.stringify(this.data))
    }
    if(this.currentUsername){
      localStorage.setItem("currentUsername",JSON.stringify(this.currentUsername))
    }
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
    

  }
  getDetails(){
    if(localStorage.getItem("data")){
      this.data=JSON.parse(localStorage.getItem("data")|| '')
    }
    if(localStorage.getItem("currentUsername")){
      this.currentUsername=JSON.parse(localStorage.getItem("currentUsername")|| '')
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")|| '')
    }
  }

  

  register(acno:any,uname:any,password:any){
    const data={
      acno,
      uname,
      password
    }
   return this.http.post('http://localhost:3000/register',data)

    
  }
  login(acno:any,pswd:any){
    const data={
      acno,
      pswd
    }
   return this.http.post('http://localhost:3000/login',data)
    
  }
// to add token in headers
  getOptions(){
    const token=JSON.parse(localStorage.getItem("token")|| '')
    // creating rqst header

    let headers= new HttpHeaders()
    if(token){
      headers=headers.append('x-access-token',token)
      options.headers=headers
    }
    return options
  }
  deposit(acno:any,pswd:any,amnt:any){
    const data={
      acno,
      pswd,
      amnt
    }
    
    // server call
   return this.http.post('http://localhost:3000/deposit',data,this.getOptions())
    

  }

  withdraw(acno:any,pswd:any,amnt:any){
    const data={
      acno,
      pswd,
      amnt
    }
    
    // server call
   return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())
}
//delete api(server call)
deleteAcc(acno:any){
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())  

}
}
