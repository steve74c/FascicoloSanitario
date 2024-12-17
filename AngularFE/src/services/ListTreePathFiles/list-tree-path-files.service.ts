import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ListTreePathFilesService {

  constructor(private http: HttpClient) {}


  getListDirFile(): any {
    const headers = {  };
    const body = {  };
    return this.http.get<any>(config.serverURL+ 'api/listDirFile', body );
  
  }


  getListDirTree(): any {
    const headers = {  };
    const body = {  };
    console.log( 'start getList');
    return this.http.get<any>(config.serverURL+ 'api/listDirTree', body )
  
  }

}  