import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../documents.service';
import { FormControl } from '@angular/forms';
import { UsersService } from '../../users/users.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents = [];
  users = [];
  msgs = [];
  roles:SelectItem[];
  login;
  role;
  access = [];
  constructor(private documentsService:DocumentsService, private usersService:UsersService) {
    this.roles = [ {label:'WRITE', value:'W'}, {label:'READ', value:'R'}]
   }

  ngOnInit() {
    this.list();
  }

  save(form:FormControl){
    this.documentsService.save(form.value).subscribe(
      () => {
        form.reset();
        this.list();
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
}
