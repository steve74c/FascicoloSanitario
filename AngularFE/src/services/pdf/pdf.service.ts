import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MyTreeItemNew } from 'src/interfaces/my-tree-item-new';
import { Observable } from 'rxjs';
import config from '../../config/config.json';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) {}

  getPDF(item: MyTreeItemNew):any {

    const headers= {       headers: new HttpHeaders({ 'Content-Type': 'application/json',    }) }
    if (item &&item.relativePath) {
      const body = {'path' : item.relativePath + '/' + item.name };

      return this.http.post( config.serverURL + 'pdf/fileNameB64',
                            body,
                            { headers: new HttpHeaders({'Content-Type': 'application/json', }), }
                          );
    }
  }

}


