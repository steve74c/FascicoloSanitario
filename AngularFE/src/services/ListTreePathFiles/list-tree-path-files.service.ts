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
    return this.http.get<any>(config.serverURL+ 'api/listDirFile', headers );

  }


  getListDirTree(): any {
    const headers = {  };
    console.log( 'start getList');
    return this.http.get<any>(config.serverURL+ 'api/listDirTree', headers )

  }
  getSqlListDirFile(): any {
    const headers = {  };
    return this.http.get<any>(config.serverURL+ 'sql/listDirFile', headers );

  }

}
