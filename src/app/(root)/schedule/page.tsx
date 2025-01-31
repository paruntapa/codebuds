"use client"

import LoaderUI from "@/components/LoaderUI";
import { useUserRole } from "@/hooks/useUserRole";
import InterviewScheduleUI from "./InterviewScheduleUI";
import { useRouter } from "next/navigation";

const SchedulePage = () => {
  const router = useRouter();

  const {isInterviewer, isLoading} = useUserRole()

  if(isLoading) return <LoaderUI />;
  if(!isInterviewer) return router.push('/')

  return (
    <InterviewScheduleUI />
  )
}

export default SchedulePage