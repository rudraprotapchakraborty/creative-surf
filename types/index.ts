export interface MenuItem {
    title: string
    href: string
    sections: {
      title: string
      href: string
      items: {
        name: string
        href: string
      }[]
    }[]
  }
  