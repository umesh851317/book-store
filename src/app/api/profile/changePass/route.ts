import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db/conenct";

export async function POST(req: NextRequest) {
       try {
              const { newPass, currPass, userId } = await req.json();

              if (!userId) {
                     return NextResponse.json({ success: false, message: "Please login first" });
              }

              const user = await db.user.findFirst({
                     where: { id: userId },
                     select: {
                            password: true
                     }
              });

              if (!user) {
                     return NextResponse.json({
                            success: false, message: "User not found"
                     });
              }
              if (user.password !== currPass) {
                     return NextResponse.json({
                            success: false,
                            message: "paslo pass sacho koni",
                     });
              }
              if (user.password === newPass) {
                     return NextResponse.json({
                            success: false,
                            message: "New password must be different from current password",
                     });
              }

              const updatedUser = await db.user.update({
                     where: { id: userId },
                     data: { password: newPass }
              });

              return NextResponse.json({
                     success: true,
                     message: "Password updated successfully",
                     data: updatedUser,
              });

       } catch (err) {
              return NextResponse.json({
                     success: false,
                     message: "Something wrong",
                     err,
              })
       }
}