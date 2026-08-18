'use client'
import React, { useState } from 'react'

const JoinButton = () => {
  const [joined, setJoined] = useState(false);
  return (
    <button onClick={()=>setJoined(!joined)} className="rounded-lg bg-black text-white px-4 py-2">
         {joined ? "Joined" : "Join Community"}
    </button>
  )
}

export default JoinButton