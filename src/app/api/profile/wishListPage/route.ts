import { NextRequest, NextResponse } from "next/server";
import Cookie from "js-cookie";
import { db } from "../../../../../db/conenct";

export async function GET(req: NextRequest) {
       const url = new URL(req.url);
       const bookId: any = url.searchParams.get("bookId");
       try {
              const userId = req.cookies.get("userId")?.value;

              if (!userId) {
                     return NextResponse.json({
                            success: false,
                            message: "please login first",
                     });
              }

              const response = await db.wishlist.findMany({
                     where: {
                            userId: userId,
                     },
              });

              const fullData = await Promise.all(
                     response.map(async (item: any) => {
                            const book = await db.addBook.findUnique({
                                   where: { id: item.bookId },
                            });

                            return {
                                   ...item,
                                   book,
                            };
                     })
              );

              return NextResponse.json({
                     success: true,
                     data: fullData,
                     message: "wishlist detail succefully", userId
              });
       } catch (err) {
              console.log("something wrong");
       }
}


export async function DELETE(req: NextRequest) {
       const url = new URL(req.url)
       const id = url.searchParams.get("wishListId") as string
       try {
              const userId = req.cookies.get("userId")?.value;
              const DeleteUser = await db.wishlist.delete({
                     where: {
                            id: id
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