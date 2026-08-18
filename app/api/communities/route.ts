import connectDB from "@/lib/db"; 
import Community from "@/models/community"; 
import { NextResponse } from "next/server"; 
export async function GET(){ 
    try{ 
        await connectDB(); 
        const communities = await Community.find({featured: true}).sort({createdAt: -1}); 
        return NextResponse.json(communities); 
    }catch(error){ 
        return NextResponse.json({error: "Failed to fetch developers"}, {status: 500}); 
    } 
} 
export async function POST(request: Request){ 
  try{ 
        const body = await request.json(); 
        await connectDB(); 
        const created = await Community.create({ 
          name: body.name,
          description: body.description,
          members: body.members ?? 0,
          featured: body.featured ?? false 
        } 
        ); 
     
    return NextResponse.json(created, {status: 201}); 
    }catch(error){ 
        return NextResponse.json( 
    {message: "Failed to create community", error: String(error)}, {status: 500}); 
        } 
 
    }