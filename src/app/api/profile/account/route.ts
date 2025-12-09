import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db/conenct";
export async function GET(req: NextRequest) {
       try {
              const userId = req.cookies.get("userId")?.value;

              if (!userId) {
                     return NextResponse.json({
                            success: false,
                            message: "please login first",
                     });
              }

              const response = await db.user.findFirst({
                     where: { id: userId },
              });

              return NextResponse.json({
                     success: true,
                     data: response,
                     message: "get User succefully"
              });
       } catch (err) {
              console.log("something wrong");
       }
}