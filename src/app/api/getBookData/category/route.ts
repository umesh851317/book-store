import { NextRequest, NextResponse } from "next/server";
import Cookie from "js-cookie";
import { db } from "../../../../../db/conenct";

export async function DELETE(req: NextRequest) {
       const url = new URL(req.url)
       const bookId = url.searchParams.get("bookId") as string
       try {
              const userId = req.cookies.get("userId")?.value;
              const DeleteUser = await db.wishlist.delete({
                     where: {
                            bookId: bookId,
                            userId:userId
                     }
              })
              return NextResponse.json({
                     success: true,
                     data: DeleteUser,
                     message: "Delete user succefully"
              })
       } catch (err) {
              return NextResponse.json({
                     success: false,
                     message: "deletion not done ",
                     err,
              })
       }
}