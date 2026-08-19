import React from 'react'
 type comProps ={
    params: Promise<{slug:string}>
 }
const page = async ({params}: comProps) => {
  const communitiesResponse= await fetch(`${process.env.AUTH_URL}/api/communities`, {
      cache: "no-store",
    })
    
  const communities = await communitiesResponse.json();
  const { slug } = await params;
  const community = communities.find((item: { slug: string }) => item.slug === slug);
  if(!community)
  {
    return(
      <section className="space-y-6">
        <h1 className="text-2xl font-bold"> Community Not Found.</h1>
        <p className="text-gray-600">The community you are looking for does not exist.</p>
      </section>
    )
  }
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">{community.name}</h1>
      <p className="text-xl">{community.description}</p>
      <p className="text-gray-600">Members: {community.members}</p>
     
    </section>
  )
}

export default page