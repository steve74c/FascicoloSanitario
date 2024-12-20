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
    const body = {'path' : item.path  };

    return this.http.post(config.serverURL + 'pdf/fileNameB64', body, { headers: new HttpHeaders({
                                                                                                    'Content-Type': 'application/json', // Questo è importante!
                                                                                                 }), });

  }


  /*

     return this.http.post(this.apiUrl, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });


  getPdf1(item: MyTreeItemNew): any {
    //const headers: HttpHeaders = new HttpHeaders({responseType: 'blob' });
    const bodyData = item.name;
    //let params: HttpParams = new HttpParams();

    //return this.http.post(this.pdfUrl, bodyData, { responseType: 'blob' });

    return this.http
    .post("https://docraptor.com/docs", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf"
      },
      user_credentials: "WEB_API_KEY",
      doc: {
        test: true,
        name: "testDocument.pdf",
        type: "pdf"
      },
      responseType: "blob"
    })
    .pipe(
      tap(
        data => console.log(documentContent, data),
        error => console.log(documentContent, error)
      )
    );
}

*/

}


