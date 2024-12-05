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
  pdfFile: string = "assets/PA_Stefano_Calderone_Fronte.pdf";

  
  
  constructor(private pdfService: PdfService) {}

  async ngOnInit() {
  }


  // ngOnChanges viene chiamato ogni volta che inputValue cambia
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['item']) {
      console.log('item:', JSON.stringify(this.item));
    }
  } 

  async getFileByServer()  {

    console.log("Server");
    this.pdfData = await this.pdfService.getPDF(this.item);
  }
  
  changeFile()  {
    console.log("CHANGEs");
    this.pdfFile = "assets/img002.pdf";

  }
  
  
  
}
