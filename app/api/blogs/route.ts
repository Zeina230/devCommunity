import connectDB from "@/lib/db";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import { string } from "zod";
export async function GET(){
    try{
        await connectDB();
        const blogs = await Blog.find().sort({createdAt: -1});
        return NextResponse.json(blogs);
    }catch(error){
        return NextResponse.json({error: "Failed to fetch blogs."}, {status: 500});
    }
}
export async function POST(request: Request){
  try{
        const body = await request.json();
        await connectDB();
        const created = await Blog.create({
            slug:body.string,
            title: body.title,
            content: body.content,
            author: body.author,
            category: body.category,
            isPublished: body.isPublished ?? true
        }
        );
    
    return NextResponse.json(created, {status: 201});
    }catch(error){
        return NextResponse.json(
    {message: "Failed to create blog", error: String(error)}, {status: 500});
        }

    }


  