import { Component, EventEmitter, Output, VERSION } from '@angular/core';
import { MyTreeItemNew } from '../../interfaces/my-tree-item-new';
import treePath from './treePathNew.json';
import { ListTreePathFilesService } from 'src/services/ListTreePathFiles/list-tree-path-files.service';

@Component({
  selector: 'div-left-new',
  templateUrl: './div-left-new.component.html',
  styleUrls: ['./div-left-new.component.css']
})

export class DivLeftComponentNew {
  public treeData: MyTreeItemNew[];
  @Output() newItemEvent = new EventEmitter<MyTreeItemNew>();

  constructor(private listTreePath: ListTreePathFilesService)  {
    this.treeData=treePath;
    //this.treeData= listTreePath.getList();
    //console.log(listTreePath.getList());
    //console.log(this.treeData);
  };



  public selectTreeItem(item: MyTreeItemNew): void {
    this.newItemEvent.emit(item);
  }
  public toggleTreeItem(item: MyTreeItemNew): void {
    item.expanded = !item.expanded;
  }
}
