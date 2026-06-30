import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectToDatabase } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();
    const { resumeId } = await params;

    const resume = await ResumeModel.findOne({
      _id: resumeId,
    });

    if (!resume)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume not found",
        },
        { status: 404 }
      );

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume fetched successfully",
        data: resume,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in get resume api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();
    const body = await req.json();
    const { resumeId } = await params;

    // ✅ Fix: Format achievements properly
    if (body.achievements) {
      // If achievements is array of objects, convert to array of strings
      if (Array.isArray(body.achievements) && body.achievements.length > 0) {
        if (typeof body.achievements[0] === 'object') {
          body.achievements = body.achievements.map((item: any) => item.title || item);
        }
      }
    }

    const updatedResume = await ResumeModel.findByIdAndUpdate(
      resumeId,
      {
        $set: body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedResume)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume failed to update",
        },
        { status: 400 }
      );

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume updated successfully",
        data: updatedResume,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in updatedResume api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}