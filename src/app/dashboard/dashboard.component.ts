import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

lDate=new Date()
  // acno=""
  // pswd=""
  // amnt=""

  // acno1=""
  // pswd1=""
  // amnt1=""
 
  depositForm=this.fb.group({
    
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amnt:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })

  withdrawForm=this.fb.group({
    
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amnt1:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })

  user:any
  acno:any


  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
    this.user=JSON.parse(localStorage.getItem("currentUsername")|| '')
   }

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("please login!!!")
      this.router.navigateByUrl("")

    }
  }
  deposit(){
    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amnt=this.depositForm.value.amnt
    if(this.depositForm.valid){
    this.ds.deposit(acno,pswd,amnt)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
      }
    },
    (result)=>{
      alert(result.error.message)
    }
    )
    
  }
  else{
    alert("form invalid")
  }

  }
  withdraw(){
    var acno=this.withdrawForm.value.acno1
    var pswd=this.withdrawForm.value.pswd1
    var amnt=this.withdrawForm.value.amnt1
    if(this.withdrawForm.valid){
    this.ds.withdraw(acno,pswd,amnt)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
      }
    },
    (result)=>{
      alert(result.error.message)
    }
    )
  }


else{
  alert("invalid form")
}
  }
  deleteFormParent(){
    this.acno=JSON.parse(localStorage.getItem("currentAcno")|| '')
  }
  onDelete(event:any){
   this.ds.deleteAcc(event)
   .subscribe((result:any)=>{
     if(result){
       alert(result.message)
       this.router.navigateByUrl("")
     }
   },
   (result)=>{
     alert(result.error.message)
   }
   )
  }
  onCancel(){
    this.acno=""
  }
  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUsername")
    this.router.navigateByUrl("")

  }
}







