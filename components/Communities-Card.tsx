import Link from 'next/link'
import React from 'react'
import { joinCommunityAction, leaveCommunityAction } from "@/components/communityActions"; 
import community from '@/models/community';
type c = {
    slug: string,
    name: string,
    description: string,
    members:number, 
}
const CommunitiesCard = (props : c) => {
  return (
    <div  className="border rounded-xl p-4 space-y-2 fley gap-3" >
              <h1 className="text-xl font-semibold">{props.name}</h1>
              <p className="text-sm text-gray-600">{props.description}</p>
              <p className="text-sm">Members: {props.members}</p>
              <Link href={`/communities/${props.slug}`} className="hover:underline">View community</Link>
    <div className="flex gap-4">
              <form action={joinCommunityAction.bind(null, props.slug)}>
                  <button type="submit" className="border rounded px-3">Join Community</button>
              </form>
              <form action={leaveCommunityAction.bind(null, props.slug)}>
                  <button type="submit"  className="border rounded px-3">Leave Community</button>
              </form>
              </div>
    </div>
)}

export default CommunitiesCard