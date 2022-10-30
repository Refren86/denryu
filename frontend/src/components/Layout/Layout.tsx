import { FC } from "react"

import { Navbar } from "../Navbar/Navbar"
import { ChildrenType } from "../../types/Common"

export const Layout: FC<ChildrenType> = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      {children}
    </div>
  )
}
