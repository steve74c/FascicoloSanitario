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
  pdfFile: any =""
  pdfDownloadName: any ="file.pdf"
  constructor(private pdfService: PdfService) {}

  async ngOnInit() {
  }

  convertBase64ToBlob(base64 :any) {
    const byteCharacters = atob(base64); // Decodifica la stringa Base64
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return byteArray;
  }
  b64toBlob(b64Data: string, contentType: string, sliceSize: number) {
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

  // ngOnChanges viene chiamato ogni volta che inputValue cambia
  ngOnChanges(changes: SimpleChanges): void {



    if (changes['item']) {
      if (changes.item.currentValue) {
      if ( changes.item.currentValue.name)  {
        this.pdfDownloadName = changes.item.currentValue.name;
        this.pdfService.getPDF(changes.item.currentValue).pipe()
                       .subscribe( (jsonPdf:any) => {
                          this.pdfFile = this.convertBase64ToBlob(jsonPdf.base64);

                          //this.pdfFile = URL.createObjectURL(this.b64toBlob(jsonPdf.base64,'data:application/pdf;base64', 1024));

                          //console.log('base64 :', jsonPdf.base64);
                          //this.pdfFile = jsonPdf.base64;

                        });
      }
    }    }

  }

}
