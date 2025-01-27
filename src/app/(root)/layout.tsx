import { ReactNode } from "react"
import StreamVideoProvider from "@/components/providers/StreamClientProvider"
const layout = ({children}: {children: ReactNode}) => {
  return (
    <StreamVideoProvider>{children}</StreamVideoProvider>
  )
}

export default layout