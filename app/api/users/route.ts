import connectDB from "@/lib/db"; 
import User from "@/models/users"; 
import { NextResponse } from "next/server"; 
export async function GET(){ 
    try{ 
        await connectDB(); 
        const user = await User.find({}).sort({createdAt: -1}); 
        return NextResponse.json(user); 
    }catch(error){ 
        return NextResponse.json({error: "Failed to fetch users"}, {status: 500}); 
    } 
} 
export async function POST(request: Request){ 
  try{ 
        const body = await request.json(); 
        await connectDB(); 
        const created = await User.create({ 
          username: body.username,
          name: body.name,
          email: body.email 
        } 
        ); 
     
    return NextResponse.json(created, {status: 201}); 
    }catch(error){ 
        return NextResponse.json( 
    {message: "Failed to create user", error: String(error)}, {status: 500}); 
        } 
    }