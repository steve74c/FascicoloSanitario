import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef
} from '@angular/core';
import { TreeItem } from './tree-item';

@Component({
  selector: 'ngxt-treecontrol',
  templateUrl: './ngxt-treecontrol.component.html',
  styleUrls: ['./ngxt-treecontrol.component.css']
})
export class NgxtTreecontrolComponent<T extends TreeItem> implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  public treeData: T[] = [];

  @ContentChild(TemplateRef)
  public nodeTemplate: TemplateRef<any> | null = null;

  public ngAfterContentInit(): void {
    if (!this.nodeTemplate) {
      throw new Error('This component needs ng-template for the tree node.');
    }
  }
}
