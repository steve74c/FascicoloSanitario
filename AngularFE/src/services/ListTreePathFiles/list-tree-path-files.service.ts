import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../config/config.json';
@Injectable({
  providedIn: 'root'
})
export class ListTreePathFilesService {

  constructor(private http: HttpClient) {}

  getList(): any {

    //const headers = {  };
    const body = {  };
    console.log( 'start getList');
    this.http.get<any>(config.serverURL+ 'api/listDirFile', body ).subscribe(data => {
      console.log('data');
      console.log(data);
  })

  console.log( 'END getList');
}



/*
.subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {

          console.error('There was an error!', error);
      }
  });

*/
}
