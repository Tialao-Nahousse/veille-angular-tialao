import { Component, OnInit } from '@angular/core';

import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash-board.models';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
 

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
 
  showAdd!: boolean;
  showUpdate!: boolean;
  // api: any;
  
  constructor(private formBuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nom : [''],
      prenoms : [''],
      email : [''],
      contact : [''],
      salaire : ['']
    })

    this.getAllEmployee();
  }

  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.nom = this.formValue.value.nom;
    this.employeeModelObj.prenoms = this.formValue.value.prenoms;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.contact = this.formValue.value.contact;
    this.employeeModelObj.salaire = this.formValue.value.salaire;

    this.api.postEmploye(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employé ajouté avec succès")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
      err=>{
      alert("Quelque chose s'est mal passé");
    })

  }

  getAllEmployee(){
    this.api.getEmploye()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }


  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['nom'].setValue(row.nom);
    this.formValue.controls['prenoms'].setValue(row.prenoms);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['contact'].setValue(row.contact);
    this.formValue.controls['salaire'].setValue(row.salaire);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.nom = this.formValue.value.nom;
    this.employeeModelObj.prenoms = this.formValue.value.prenoms;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.contact = this.formValue.value.contact;
    this.employeeModelObj.salaire = this.formValue.value.salaire;
    this.api.updateEmploye(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=> {
      alert("Mise à jour éffectuée avec success");
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res =>{
      alert("Employé supprimé avec success");
      this.getAllEmployee();  
    })
  }

}
