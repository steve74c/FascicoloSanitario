import { Component, EventEmitter, Output, VERSION } from '@angular/core';
import { MyTreeItemNew } from '../../interfaces/my-tree-item-new';
import treePath from './treePathNew.json';
import treePathTest from './treePathNewTest.json';
import { ListTreePathFilesService } from 'src/services/ListTreePathFiles/list-tree-path-files.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { PdfService } from 'src/services/pdf/pdf.service';

@Component({
  selector: 'div-left-new',
  templateUrl: './div-left-new.component.html',
  styleUrls: ['./div-left-new.component.css']
})

export class DivLeftComponentNew {
  public treeData: MyTreeItemNew[] =[];
  @Output() newItemEvent = new EventEmitter<MyTreeItemNew>();

  constructor(private listTreePath: ListTreePathFilesService  )  {};

  ngOnInit() {
    this.listTreePath.getSqlListDirFile().subscribe((response: MyTreeItemNew) => { this.treeData = Array(response);  });
  }

  public selectTreeItem(item: MyTreeItemNew): void {
    //console.log(item.path)
    this.newItemEvent.emit(item);
  }
  public toggleTreeItem(item: MyTreeItemNew): void {
    item.expanded = !item.expanded;
  }
}
