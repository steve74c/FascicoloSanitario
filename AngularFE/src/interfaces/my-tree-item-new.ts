
export interface MyTreeItemNew {
  name: string,
  path: string,
  relativePath: string,
  type: string,
  isSymbolicLink?:boolean;
  expanded?:boolean;
  extension?:string;
  sizeInBytes:number;
  size:string;
  hash:string;
  children?:MyTreeItemNew[];
}

