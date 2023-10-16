import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Kritika } from './kritika';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  refKritikak: AngularFireList<Kritika>

  constructor(private db:AngularFireDatabase) { 
    this.refKritikak=this.db.list("kritikak")
  }

  get(){
    return this.refKritikak
  }

  createNew(body:any){
    return this.refKritikak.push(body)
  }

}
