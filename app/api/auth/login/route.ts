import { NextResponse, NextRequest } from "next/server";
import DbConnection from "@/dbConfig/db";
import User from "@/models/user.model";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password)
      return NextResponse.json(
        { message: "All Feild is Required" },
        { status: 400 }
      );
    await DbConnection();
    const userExites = await User.findOne({ email });
    if (!userExites) {
      return NextResponse.json({ message: "User Not Found" }, { status: 400 });
    }
    const isPasswordMatched = await userExites.comparePassword(password);
    if (!isPasswordMatched) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );
    }
    const userObj = userExites.toObject();
    delete userObj.password;
    const token = userExites.tokenProvider();
    const response = NextResponse.json(
      { message: "Login Successfully", userObj },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
