import { Component, VERSION } from '@angular/core';
import { MyTreeItem } from '../../interfaces/my-tree-item';
import treePath from './treePath.json';

@Component({
  selector: 'div-left',
  templateUrl: './div-left.component.html',
  styleUrls: ['./div-left.component.css']
})

export class DivLeftComponent {
  public treeData: MyTreeItem[] = treePath;
  
  
  public toggleTreeItem(item: MyTreeItem): void {
    item.expanded = !item.expanded;
  }
}
