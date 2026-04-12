export interface NavProps {
  title: string,
  ref: MutableRefObject<HTMLDivElement>,
  isVisible?: boolean,
  path?: string
}

export interface PageNavProps {
  menuTitle: string,
  path: string
}

export interface PageDataType {
    path?: string;
    storeDataList?: any[];
    currentData?: any;
}