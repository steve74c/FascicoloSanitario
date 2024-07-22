import { Component, Input } from '@angular/core';
import { MyTreeItemNew } from '../../interfaces/my-tree-item-new';


@Component({
  selector: 'div-right',
  templateUrl: './div-right.component.html',
  styleUrls: ['./div-right.component.css']
})

export class DivRightComponent {
  @Input()
  item!: MyTreeItemNew;
  

  src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  
  
}
