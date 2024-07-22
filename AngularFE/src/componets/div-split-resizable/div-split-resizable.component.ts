import { Component } from '@angular/core';
import { MyTreeItemNew } from '../../interfaces/my-tree-item-new';

@Component({
  selector: 'app-div-split-resizable',
  templateUrl: './div-split-resizable.component.html',
  styleUrls: ['./div-split-resizable.component.css']
})
export class DivSplitResizable {
  title = 'flex-resize-demo';
  item!: MyTreeItemNew;

  itemStr :string ="" ;

  setItem(newItem: MyTreeItemNew) {
    this.item = newItem;
    this.itemStr= JSON.stringify(newItem);
  }
}



