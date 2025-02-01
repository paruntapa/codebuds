"use client"

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import { Loader2Icon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";

export default function Home() {
  const router = useRouter()
  const {isInterviewer, isCandidate, isLoading} = useUserRole()
  const interviews = useQuery(api.interviews.getMyInterviews)

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) =>{
    switch (title){
      case "New Call":
        setModalType("start")
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join")
        setShowModal(true);
        break;

      default:
        router.push(`/${title.toLowerCase().trim().split(" ").join(" ")}`);
    }
  };

  if(isLoading) return <LoaderUI />;
  
  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* WELCOME */}
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          {isInterviewer? 
          "Welcome back, Interviewer!" :
          "Welcome back, Candidate!"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </div>

      {isInterviewer ? 
      ( <>
      <div className="grid sm:grid-cols-4 lg:grid-cols-4 gap-6">
        {QUICK_ACTIONS.map((action) => (
          <ActionCard
          key={action.title}
          action={action}
          onClick={() => handleQuickAction(action.title)}
          />
        ))}
      </div>

      <MeetingModal 
      isOpen={showModal}
      onClose={()=>{setShowModal(false)}}
      title={modalType === "join" ? "Join Meeting": "Start Meeting"}
      isJoinMeeting = {modalType === "join"}
      />
      </>) : (
        <>
      <div>
        <h1 className="text-3xl font-bold">Your Interveiws</h1>
        <p className="text-muted-foreground mt-1"> View and Join your scheduled interviews</p>
      </div>

      <div className="mt-8">
        {interviews === undefined ? 
        (
          <div className="flex justify-center py-12">
            <Loader2Icon className="size-8 animate-spin text-muted-foreground"/>
          </div>
        ) 
        : 
        interviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:flex-col lg:grid-cols-3 tracking-tight justify-between">
            {interviews.map((interview)=>(
              <MeetingCard key={interview._id} interview={interview} />
            ))}
          </div>
        ) :(
          <div className="text-center py-12 text-muted-foreground">
            You have no Schduled interviews
          </div>
        )}
      </div>
      </>
    )}
    </div>
  );
}
