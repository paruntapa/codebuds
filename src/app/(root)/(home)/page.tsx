"use client"

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";

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

  if(isLoading) return <p>Loading...</p>
  
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
      isJoingModal = {modalType === "join"}
      />
      </>) : (<>
      candidate goes here
      </>)}
    </div>
  );
}