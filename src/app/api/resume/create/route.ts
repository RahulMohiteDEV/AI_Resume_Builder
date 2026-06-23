import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectToDatabase } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const userId = await getCurrentUser();

    const body = await req.json();

    const { title, jobTitle, experienceLevel } = body;

    const newResume = await ResumeModel.create({
      user_id: userId,
      title,
      jobTitle,
      experienceLevel,
      summary: "",
      personalInfo: {},
      workExperience: [],
      projects: [],
      education: [],
      certifications: [],
      skills: [],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Resume created successfully",
        data: newResume,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}