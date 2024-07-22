
export interface MyTreeItem {
  children?: MyTreeItem[];
  expanded?: boolean;
  display: string;
  value: string;
}

