import { NextRequest, NextResponse } from "next/server";
import Cookie from "js-cookie";
import { db } from "../../../../../db/conenct";
// import { db } from "../../../../lib/db";



export async function POST(req: NextRequest) {
       const data = await req.json();

       try {
              const userId = req.cookies.get("userId")?.value;
              if (!userId) {
                     return NextResponse.json({ success: false, message: "Please login first" }, { status: 401 });
              }

              const newBook = await db.cart.create({
                     data: {
                            bookId: data.bookId,
                            userId: userId,
                            qty: data.qty,
                            saveLater:data.saveLater
                     },
              });


              return NextResponse.json({
                     success: true,
                     message: "book saved in cart successfully",
                     data: newBook,
              });

       } catch (error) {
              console.error(error);
              return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
       }
}


export async function GET(req: NextRequest) {
       const url = new URL(req.url);
       const bookId = url.searchParams.get("bookId");
       try {
              const userId = req.cookies.get("userId")?.value;

              if (!userId) {
                     return NextResponse.json({
                            success: false,
                            message: "please login first",
                            // userId
                     });
              }

              const cartItem = await db.cart.findFirst({
                     where: {
                            bookId:bookId,
                            userId:userId,
                     },
              });

              return NextResponse.json({
                     success: true,
                     data: cartItem,
                     message: "get User succefully", userId
              });
       } catch (err) {
              console.log("something wrong");
       }
}

export async function DELETE(req: NextRequest) {
       const url = new URL(req.url)
       const bookId = url.searchParams.get("cartId") as string
       try {
              const userId = req.cookies.get("userId")?.value;
              const DeleteUser = await db.cart.delete({
                     where: {
                            id: bookId
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