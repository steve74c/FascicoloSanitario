import { Component, Input, SimpleChanges } from '@angular/core';
import { MyTreeItemNew } from '../../interfaces/my-tree-item-new';
import { PdfService } from 'src/services/pdf/pdf.service';
//import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';


@Component({
  selector: 'div-right-new',
  templateUrl: './div-right.component.html',
  styleUrls: ['./div-right.component.css']
})

export class DivRightNewComponent {
  @Input()
  item!: MyTreeItemNew;
  pdfData:Promise<ArrayBuffer> | undefined;
  pdfFile: any = "assets/PA_Stefano_Calderone_Fronte.pdf";



  constructor(private pdfService: PdfService) {}

  async ngOnInit() {
  }


  // ngOnChanges viene chiamato ogni volta che inputValue cambia
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['item']) {
      //this.pdfFile=this.item
      //console.log('item :', JSON.stringify(this.item));
      console.log('item :', this.item.path);
      this.pdfService.getPDF(this.item).subscribe( (jsonPdf:any) => {
        console.log(jsonPdf.base64);

        const byteCharacters = atob(jsonPdf.base64); // Decodifica la stringa Base64
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);

        this.pdfFile = byteArray;
    });

    }
  }


  convertBase64ToBlob(base64 :any) {
    const byteArray = new Uint8Array(
      atob(base64)
        .split("")
        .map(char => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: "application/pdf" });
    return file;
  }



    /*
  async getFileByServer()  {

    console.log("Server");

    await this.pdfService.getPDF(this.item).subscribe({
      next: (data :any) => {
        console.log('item aaaaaaa:', data);
        this.pdfFile = data;
      },
      error: (error:any) => {
          console.error('There was an error!', error);
      }
    });

  }
        */

/*
   b64toBlob(b64Data: string, contentType='', sliceSize=512)  {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
    */


  changeFile()  {

    const contentType = 'application/pdf';
    const b64Data = "60,49,126,215,93,116,161,184,255,10,183,154,182,138,195,122,247,165,162,151,171,219,77,52,252,42,222,106,218,43,13,171,94,78,231,137,106,125,56,219,77,182,252,11,173,134,138,206,173,167,37,121,23,169,162,187,108,252,250,232,118,231,30,172,234,218,114,87,143,12,87,107,138,247,171,253,56,173,149,226,17,27,157,122,239,125,250,214,151,95,122,119,104,110,62,116,161,184,255,45,233,224,182,30,180,70,203,107,121,169,129,79,157,59,247,174,52,211,68,195,252,93,61,211,68,223,213,56,250,227,207,180,211,132,195,253,56,254,227,159,60,211,77,19,12,246,160,138,118,147,143,238,57,227,125,183,247,111,19,15,241,117,215,77,52,77,240,232,114,233,158,158,218,31,138,185,154,182,135,98,130,43,90,150,103,167,181,232,167,117,171,90,211,141,53,219,77,182,117,169,102,121,216,156,161,18,1,0,176,206,52,65,136,57,80,13,52,137,104,174,40,34,157,169,94,118,40,34,181,169,94,78,61,52,211,237,117,243,132,195,114,137,236,122,187,218,182,137,222,150,200,172,181,233,154,118,32,168,158,199,171,189,172,226,162,119,139,122,6,165,121,42,44,182,43,110,182,43,218,117,233,101,3,56,158,157,214,142,178,151,157,106,88,158,173,164,227,231,78,53,235,237,187,227,68,195,252,93,61,211,68,223,213,56,196,79,93,52,195,66,116,143,93,124,227,157,121,235,142,120,211,77,59,243,77,43,121,32,83,215,189,184,227,205,247,217,48,255,23,95,116,209,55,192,52,3,13,17,34,19,143,77,52,251,142,124,209,48,195,17,32,145,33,146,14,52,66,13,76,68,85,16,212,206,8,114,17,81,17,136,8,228,227,211,77,62,223,158,52,76,52,196,68,3,200,0,35,141,72,129,139,32,4,192,252,35,141,77,19,139,44,132,148,8,33,18,72,133,72,252,68,128,48,132,72,8,114,4,73,50,19,143,158,250,211,175,52,209,48,255,23,79,116,209,55,233,206,154,43,181,171,104,173,231,98,60,200,167,181,234,218,166,38,156,162,119,26,173,216,168,1,32,46,150,216,166,105,171,44,186,124,226,162,119,162,151,125,118,211,109,147,143,77,52,251,142,124,209,48,236,138,202,41,166,182,172,178,39,157,121,169,101,106,202,104,174,214,179,138,137,222,117,233,101,106,119,168,126,186,38,107,56,168,157,231,172,138,154,44,182,39,34,165,166,165,215,205,118,211,109,147,143,77,52,251,126,119,233,48,236,162,202,94,157,215,171,121,198,171,118,42,26,178,152,171,138,118,185,130,10,107,138,102,157,122,89,98,158,215,171,189,233,237,161,235,40,178,216,173,186,42,222,114,137,236,122,87,169,106,184,167,107,77,245,126,91,28,78,62,52,231,222,190,219,95,56,76,50,11,72,3,72,76,4,72,57,56,254,235,141,60,251,109,55,233,48,195,162,219,81,32,16,11,12,227,68,24,131,149,0,211,72,78,61,247,219,143,181,211,109,19,13,16,75,24,211,122,208,189,124,23,109,57,41,56,248,223,221,190,215,77,180,76,61,56,255,77,127,219,77,182,78,63,184,215,221,56,251,109,180,225,48,205,4,137,232,113,198,172,138,137,222,117,232,172,185,199,30,178,200,175,137,202,39,182,186,37,150,39,218,182,218,40,109,185,98,130,135,172,137,184,171,121,169,108,106,120,173,106,184,168,138,90,107,122,199,167,181,231,104,114,233,158,158,218,19,143,109,181,227,141,185,223,221,147,15,241,117,247,77,19,125,39,172,178,132,227,211,77,62,215,109,52,76,56,165,78,61,52,211,237,117,247,164,195,138,116,227,251,94,246,243,141,184,223,100,195,252,93,61,211,68,223,8,2,195,17,19,141,16,84,64,52,33,18,8,228,227,211,77,62,215,109,52,76,51,143,60,128,206,48,3,4,69,50,13,1,56,244,211,79,181,215,222,147,12,194,11,0,211,140,33,56,244,211,79,181,219,78,19,15,127,118,235,111,53,243,77,19,143,110,125,219,77,250,211,68,195,49,56,244,211,79,181,219,77,19,15,110,63,211,223,245,247,141,147,143,77,52,251,93,125,233,48,213,32,2,196,48,227,89,3,132,227,251,126,187,219,77,183,235,68,195,252,93,125,211,68,223,74,40,19,143,77,52,251,93,180,209,48,205,106,218,26,78,61,52,211,237,117,247,164,195,69,235,34,117,233,237,121,164,227,211,77,62,215,109,118,76,52,222,149,231,232,158,132,227,211,78,56,243,78,19,12,42,29,137,199,133,138,199,26,149,228,227,215,79,52,211,78,52,76,63,197,211,221,52,77,240,139,12,83,66,227,99,246,224,109,60,217,20,227,215,189,188,211,237,55,233,48,255,23,95,116,209,55,211,122,203,30,173,164,154,158,43,90,174,38,147,143,206,184,211,77,246,76,63,197,211,221,52,77,244,227,251,94,120,243,205,123,227,111,19,15,241,117,215,109,52,77,240,18,73,52,97,161,215,167,177,228,227,251,94,117,219,237,116,215,164,195,252,93,60,211,68,223,219,77,54,224,96,17,4,1,141,1,49,12,32,176,13,17,33,19,143,109,61,219,239,118,225,48,213,32,2,196,20,228,75,0,210,13,35,222,83,143,237,251,243,143,184,239,77,19,15,241,117,215,93,52,77,240,135,33,21,17,24,128,6,16,222,64,48,16,78,44,180,227,251,143,122,251,93,180,209,48,195,138,183,173,182,138,222,13,19,0,73,34,12,56,98,18,44,227,83,143,238,188,235,143,182,227,190,147,12,3,1,44,68,136,56,210,3,32,81,72,8,130,200,88,229,13,12,32,17,17,55,165,211,111,253,247,141,244,231,143,118,78,61,116,235,222,181,215,221,147,13,55,165,211,111,253,247,141,244,231,125,123,78,63,183,235,77,62,227,221,250,76,63,197,215,93,180,209,55,200,53,49,17,84,67,83,32,3,1,80,176,19,57,18,0,44,132,227,17,58,188,211,174,52,211,125,251,235,94,182,243,174,180,223,167,38,254,41,182,231,191,67,161,10,188,215,173,52,211,142,56,211,94,124,227,189,117,235,135,38,254,41,182,235,125,67,161,7,167,118,203,107,121,169,158,157,218,27,143,173,40,110,61,184,235,151,167,118,134,227,239,74,27,143,244,242,165,239,197,162,123,127,53,169,158,252,93,63,74,230,237,202,151,191,79,42,94,215,241,39,114,135,98,158,15,214,138,112,39,178,33,39,114,135,98,158,15,193,106,199,133,162,123,127,2,184,154,151,241,98,174,203,66,133,170,246,227,242,218,178,208,161,106,189,185,231,245,162,118,216,108,243,68,127,22,137,237,13,235,28,174,42,109,162,191,116,69,233,221,161,184,252,210,134,227,239,142,251,227,190,248,239,190,59,239,142,251,227,190,248,239,190,59,219,205,55,211,189,250,211,158,180,231,173,60,247,126,186,239,95,59,223,125,247,223,125,252,239,159,59,219,205,55,223,125,188,211,111,52,231,173,57,235,78,122,211,158,180,231,173,57,235,78,122,211,158,180,231,173,57,235,77,188,211,111,52,231,206,249,243,190,124,239,158,180,215,77,119,235,174,250,235,190,246,211,189,180,235,174,250,215,126,251,223,189,180,219,205,57,211,190,186,239,158,180,243,93,251,219,78,251,223,174,187,239,189,251,219,78,186,239,173,52,239,109,58,235,189,116,211,78,185,223,174,119,235,93,246,243,77,188,211,111,52,227,157,249,235,77,247,223,158,180,231,173,57,211,190,122,211,158,180,219,205,57,235,78,122,211,109,187,219,110,249,211,189,182,239,206,52,231,173,57,235,78,122,211,158,180,223,125,249,211,189,188,211,158,180,227,221,251,211,190,60,211,143,119,227,221,247,223,125,186,239,125,247,231,206,251,227,191,58,239,158,59,219,110,247,235,77,247,223,93,52,211,158,180,231,173,57,235,77,116,215,125,116,231,125,247,223,93,53,223,159,59,243,157,251,219,78,122,211,109,187,219,110,247,223,125,247,223,126,59,231,173,53,211,77,59,227,189,116,211,79,116,239,125,247,243,93,248,227,78,122,211,158,59,219,205,58,227,78,61,223,157,59,231,173,56,247,125,186,239,158,180,235,174,251,223,126,246,211,158,180,231,206,247,223,126,247,223,111,52,227,77,57,227,189,188,211,109,187,227,93,249,239,126,119,223,111,52,231,173,53,211,174,249,211,190,122,211,109,187,235,174,249,211,189,188,211,174,187,235,157,250,235,190,120,239,175,52,235,174,253,219,78,180,211,189,180,239,109,57,243,190,185,223,205,119,239,109,59,239,126,246,211,174,187,239,109,58,211,78,184,211,190,180,235,157,251,223,126,186,239,221,180,247,125,251,243,191,60,211,174,119,239,109,53,211,93,251,219,78,122,211,158,247,231,125,247,235,78,124,239,158,180,235,174,248,231,126,122,211,158,180,227,141,57,243,190,189,223,158,59,231,173,57,227,190,122,211,157,59,227,157,248,247,127,54,239,143,52,231,189,249,219,79,52,211,205,187,235,110,251,219,78,118,211,157,59,239,142,249,227,183,167,118,134,227,247,74,27,143,244,242,165,239,197,162,123,67,122,199,43,138,155,104,175,241,104,158,211,90,153,239,192,174,38,165,252,11,28,122,123,124,247,127,194,106,145,222,138,8,109,239,206,255,13,235,28,122,123,126,219,93,255,22,86,160,179,125,191,22,137,237,4,26,49,211,77,52,252,139,90,150,39,0,158,9,94,211,244,173,122,101,116,252,11,224,90,39,109,135,158,247,252,198,177,90,39,109,135,93,58,237,233,221,161,184,245,211,74,27,143,244,242,165,239,197,162,123,127,53,169,158,252,93,127,74,230,237,202,151,191,79,42,94,215,241,39,114,135,98,158,15,214,138,112,39,178,33,39,114,135,98,158,15,193,106,199,133,162,123,127,2,184,154,148,26,37,119,241,98,174,203,66,133,170,246,227,242,218,178,208,161,106,189,185,231,245,162,118,216,108,215,93,17,252,90,39,180,55,172,114,184,169,182,138,245,219,68,94,157,218,27,143,93,116,161,184,251,227,142,248,227,190,56,239,142,59,227,142,248,227,190,56,239,142,54,239,173,245,219,142,188,231,157,185,231,111,59,235,189,180,219,141,55,223,173,247,235,127,56,231,190,182,239,173,247,235,110,250,219,190,185,231,110,121,219,158,118,231,157,185,231,110,121,219,158,118,231,157,185,231,110,121,219,125,250,223,126,185,239,174,123,235,158,250,235,93,189,239,110,188,227,189,180,239,109,59,219,78,186,211,173,118,239,205,59,219,77,187,235,158,118,239,109,58,215,111,57,219,189,180,239,205,58,235,78,252,211,189,180,235,173,58,219,142,246,211,174,180,247,143,58,235,78,187,219,173,118,223,126,182,239,173,247,235,158,250,231,157,183,223,174,121,219,173,118,231,157,186,215,110,121,219,125,250,235,93,186,215,109,187,235,110,250,231,157,182,239,175,60,243,173,118,235,93,186,215,110,181,219,127,56,231,157,183,223,174,181,219,158,184,239,221,185,231,110,120,211,157,56,223,206,54,239,173,252,227,158,250,239,142,57,231,110,248,227,110,250,231,157,185,211,143,125,235,158,118,231,157,183,223,173,116,219,78,186,211,125,250,247,222,187,227,142,181,219,190,56,239,142,54,239,173,187,235,157,56,231,78,55,227,206,121,219,223,122,223,93,189,247,174,121,219,125,250,247,126,187,227,142,116,227,174,246,219,190,183,223,174,121,219,158,118,231,157,185,231,109,187,235,158,118,223,110,59,223,109,251,219,158,118,231,190,183,223,174,247,219,158,118,223,222,185,231,109,247,235,125,250,223,126,185,239,174,121,219,110,250,223,110,55,223,173,250,211,158,118,243,111,60,219,207,54,243,173,118,235,206,58,243,142,188,227,175,56,235,206,58,243,143,125,235,189,180,235,173,58,235,78,186,211,174,180,219,190,182,239,173,187,235,110,250,239,109,59,219,78,252,211,191,52,239,205,59,243,78,252,211,158,250,239,205,59,219,78,246,211,189,180,239,109,58,239,110,186,211,173,118,231,157,185,231,110,121,219,158,118,231,157,185,231,111,60,243,158,118,231,157,185,231,110,121,219,158,118,219,190,182,239,173,187,235,110,250,235,93,186,215,110,181,219,173,118,235,93,186,215,110,181,219,158,118,235,93,186,215,110,181,219,173,118,235,93,185,227,78,181,219,158,52,122,119,104,110,61,118,210,134,227,253,60,169,123,241,104,158,208,222,177,202,226,166,218,43,252,90,39,180,214,166,123,240,43,137,169,65,162,87,127,2,199,30,158,223,118,227,240,154,164,119,162,130,27,123,235,207,195,122,199,30,158,223,182,219,207,197,149,168,44,223,111,197,162,123,65,6,140,116,211,77,63,34,214,165,137,192,39,130,87,180,253,43,94,153,93,63,2,248,22,137,219,97,231,174,63,49,172,86,137,219,97,215,77,180,122,119,104,110,61,119,210,134,227,253,60,169,123,245,206,110,55,156,183,244,174,110,220,169,123,242,38,106,7,191,53,169,158,254,41,182,231,191,127,90,39,109,135,125,116,252,119,162,130,27,117,235,207,193,138,219,15,122,176,168,154,154,39,122,123,124,252,42,37,162,180,169,105,199,191,13,235,226,113,225,171,107,47,197,138,91,94,175,240,18,8,130,60,228,55,156,161,215,191,45,149,131,121,202,29,123,242,222,158,11,97,215,141,17,178,218,222,106,98,119,41,109,251,40,49,15,171,90";

    let byteNumbers= [];
    for (var i = 0; i < b64Data.length; i++) {
      byteNumbers[i] = b64Data.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: 'application/pdf;base64' });
    //const blob = this.b64toBlob(b64Data, contentType);
    //var file = new Blob(b64Data, { type: 'application/pdf;base64' });
    //this.pdfFile = `data:application/pdf;base64,${b64Data}`;

    //this.pdfFile = blob;

  }



}
