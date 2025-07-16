"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { MenuItem } from "@/types"

interface MobileMenuProps {
  menuItems: MenuItem[]
  handleNavigation: (href: string, itemName?: string) => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems, handleNavigation }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden mobile-menu-trigger">
        <Menu className="h-6 w-6 text-gray-700" />
      </SheetTrigger>
      <SheetContent side="left" className="mobile-menu-content">
        <button className="mobile-menu-close absolute top-4 right-4" onClick={() => setOpen(false)}>
          <X className="h-6 w-6" />
        </button>
        <nav className="mt-10 space-y-6">
          {menuItems.map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              {item.sections.map((section) => (
                <div key={section.title} className="ml-4">
                  <Link
                    href={section.href}
                    onClick={() => {
                      handleNavigation(section.href, section.title)
                      setOpen(false)
                    }}
                    className="block font-medium text-gray-600 hover:text-blue-600 mt-2"
                  >
                    {section.title}
                  </Link>
                  <ul className="ml-2 mt-1">
                    {section.items.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.href}
                          onClick={() => {
                            handleNavigation(subItem.href, subItem.name)
                            setOpen(false)
                          }}
                          className="text-sm text-gray-500 hover:text-blue-600"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu
