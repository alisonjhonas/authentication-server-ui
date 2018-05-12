import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../documents.service';
import { FormControl } from '@angular/forms';
import { UsersService } from '../../users/users.service';
import {SelectItem} from 'primeng/api';
import { AccessTable } from '../../users/access-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})

export class DocumentsComponent implements OnInit {
  documents = [];
  users = [];
  msgs = [];
  roles = [];
  tables = [];
  user:any;
  role:string;
  document:any;
  display: boolean = false;
  constructor(private documentsService:DocumentsService, private usersService:UsersService, private router:Router) { 
    this.roles = [{name:"WRITE", value:"WRITE"},{name:"READ", value:"READ"}];
    this.document = {};
   }

  ngOnInit() {
    this.list();
  }

  save(form:FormControl){
    form.value.active = true;
    console.log(document);
    this.documentsService.save(form.value).subscribe(
      () => {
        form.reset();
        this.list();
        this.display = false;
      },
      error=>{
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error Message', detail:error.error.message});
      }
    );
  }
  list(){
    this.documentsService.list().subscribe((data)=>{
      this.documents = data;
    },
    error=>{
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error Message', detail:error.error.message});
    });
  }
  search(event){
    this.usersService.get(event.query).subscribe((data)=>{
      this.users = data;
    });
  }
  delete(docment:any){
    console.log("Delete document");
    console.log(docment);
    this.documentsService.delete(docment).subscribe((data)=>{
      this.list();
    });
  }
  edit(doc:any){
    this.documentsService.getDocument(doc.document).subscribe(data=>{
      this.document=data;
    });
  }
}
