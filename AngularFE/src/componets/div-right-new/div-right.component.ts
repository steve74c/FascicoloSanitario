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

  async ngOnInit() { }

  convertBase64ToBlob(base64 :any) {
    const byteCharacters = atob(base64); // Decodifica la stringa Base64
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return byteArray;
  }

  // ngOnChanges viene chiamato ogni volta che inputValue cambia
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['item']) {
      //console.log('item :', this.item.path);
      if ( this.item)  {
        this.pdfService.getPDF(this.item).subscribe( (jsonPdf:any) => { this.pdfFile = this.convertBase64ToBlob(jsonPdf.base64); });
      }
    }
  }

}
