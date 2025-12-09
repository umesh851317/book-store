import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db/conenct";
import { error } from "console";

export async function POST(req: Request) {
       const data = await req.json();

       try {
              const existUser = await db.user.findFirst({
                     where: { email: data.email },
              });

              if (!existUser) {
                     return NextResponse.json({
                            success: true,
                            message: "Invalid User",
                            error: "Invalid User",
                     })
                     
              }
              if (existUser.password !== data.password) {
                     return NextResponse.json({
                            success: true,
                            message: "Invalid Password",
                            error: "Invalid Password",
                     })
              }

              if (existUser) {
                     return NextResponse.json({
                            success: true,
                            message: "User login succefully",
                            error: error,
                            data:existUser
                     })
              }

       }
       catch (err) {
              alert(err)
       }
}