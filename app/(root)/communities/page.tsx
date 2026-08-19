import React from 'react'
import CommunitiesCard from '@/components/Communities-Card'

const page = async () => {
  const communitiesResponse= await fetch(`${process.env.AUTH_URL}/api/communities`, {
      cache: "no-store",
    })
    
  const communities = await communitiesResponse.json();

return(
    <section className="space-y-6">
      <div className="space-y-6">
        <h1 className="text-3xl text-blue-500 font-bold">Communities</h1>
        <p className="text-xl text-gray-500">Discover and join our developer communities that match your interests.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
           {communities.map((community:any) => (
      <CommunitiesCard key={community.slug} name={community.name} description={community.description} members={community.members} slug={community.slug} />
           ))}
        </div>
      </div>
    </section>
  )
}

export default page