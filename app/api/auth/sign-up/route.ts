import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import DbConnection from "@/dbConfig/db";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    if (!name || !email || !password)
      return NextResponse.json(
        { message: "All feild is Required" },
        { status: 400 }
      );
    await DbConnection();
    const userExites = await User.findOne({ email });
    if (userExites) {
      return NextResponse.json(
        { message: "Eamil is already Exites" },
        { status: 400 }
      );
    }
    const user = await User.create({ name, email, password });
    return NextResponse.json(
      { message: "User Created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Somthing is wrong" }, { status: 500 });
  }
}
