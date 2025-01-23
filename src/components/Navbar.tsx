import { SignedIn, UserButton } from '@clerk/nextjs'
import { CodeIcon } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from './ModeToggle'
import DashboardBtn from './DashboardBtn'

const Navbar = () => {
  return (
    <nav className='border-b'>
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* LEFT SIDE -LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          <CodeIcon className="size-8 text-purple-500" />
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            CodeBud
          </span>
        </Link>

        {/* RIGHT SIDE - ACTIONS */}
        <SignedIn>
          <div className="flex items-center space-x-4 ml-auto">
            <DashboardBtn />
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
        </div>
        
        
    </nav>
  )
}

export default Navbar