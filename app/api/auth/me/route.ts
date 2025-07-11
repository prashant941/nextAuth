import { getDatafromToken } from "@/utils/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import DbConnection from "@/dbConfig/db";

export async function GET(req: NextRequest) {
    try {
        await DbConnection();
        const userId = getDatafromToken(req);
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User Not Found" }, { status: 400 });
        }
        const userObj = user.toObject();
        delete userObj.password;
        return NextResponse.json({ message: "User Found", userObj }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}
    