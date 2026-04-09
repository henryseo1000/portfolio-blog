export interface NavProps {
  title: string,
  ref: MutableRefObject<HTMLDivElement>,
  isVisible?: boolean
}

export interface PageNavProps {
  menuTitle: string,
  path: string
}