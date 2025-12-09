import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db/conenct";

export async function PUT(req: NextRequest) {
       try {
              const userId = req.cookies.get("userId")?.value;
              const data = await req.json();

              if (!userId) {
                     return NextResponse.json({
                            success: false,
                            message: "Please login first",
                     }, { status: 401 });
              }

              const updatedUser = await db.user.update({
                     where: { id: userId },
                     data: {
                            name: data.name,
                            email: data.email,
                            mobile: data.mobile,
                            address: data.address,
                     },
              });

              return NextResponse.json({
                     success: true,
                     data: updatedUser,
                     message: "User updated successfully",
              });
       } catch (err) {
              return NextResponse.json({
                     success: false,
                     message: "Something wrong",
                     err,
              })
       }
}