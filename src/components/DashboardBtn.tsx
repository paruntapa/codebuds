"use client"
import Link from 'next/link';
import { Button } from './ui/button';
import { SparklesIcon } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';

const DashboardBtn = () => {

    const {isCandidate, isLoading} = useUserRole()

    if(isCandidate || isLoading) return null;

  return (
    <Link href={"/dashboard"}>
    <Button className='gap-2 font-medium bg-blue-700 hover:bg-blue-800 text-white p-5 text-sm ' size={"sm"}> 
        <SparklesIcon className="size-4"/>
        Dashboard

    </Button>
    </Link>
  )
}

export default DashboardBtn 