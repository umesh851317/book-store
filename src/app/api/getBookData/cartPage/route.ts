import { NextRequest, NextResponse } from "next/server";
import Cookie from "js-cookie";
import { db } from "../../../../../db/conenct";

export async function GET(req: NextRequest) {
       const url = new URL(req.url);
       const bookId = url.searchParams.get("bookId") as string;

       try {
              const userId = req.cookies.get("userId")?.value;

              if (!userId) {
                     return NextResponse.json({
                            success: false,
                            message: "please login first",
                     });
              }

              const response = await db.cart.findMany({
                     where: { userId: userId },
              });

              const withBook = await Promise.all(
                     response.map(async (item: any) => {
                            const book = await db.addBook.findUnique({ where: { id: item.bookId } })
                            return {
                                   ...item, book
                            }
                     })
              )

              return NextResponse.json({
                     success: true,
                     data: withBook,
                     message: "get books succefully", userId
              });
       } catch (err) {
              console.log("something wrong");
       }
}


export async function PUT(req: NextRequest) {
       const url = new URL(req.url);
       const cartId = url.searchParams.get("cartId") as string;  // cartId
       const action = url.searchParams.get("action") as string   // action
       const userId = req.cookies.get("userId")?.value;
       try {
              const current:any = await db.cart.findUnique({ where: { id: cartId } })
              const newQty = action === "inc" ? current.qty + 1 : current.qty - 1
              if (newQty <= 0) {
                     await db.cart.delete({ where: { id: cartId } });
                     return NextResponse.json({
                            success: true,
                            message: "Item removed because qty reached 0",
                     });
              }
              const updateUser = await db.cart.update({
                     where: { id: cartId },
                     data: { qty: newQty },
              })
              return NextResponse.json({
                     success: true,
                     data: updateUser,
                     message: "save Later update succefully"
              })
       } catch (err) {
              return NextResponse.json({
                     success: false,
                     message: "Something wrong",
                     err,
              })
       }
}


export async function DELETE(req: NextRequest) {
       const url = new URL(req.url)
       const cartId = url.searchParams.get("cartId") as string;  // cartId
       try {
              const DeleteUser = await db.cart.delete({
                     where: { id: cartId }
              })
              return NextResponse.json({
                     success: true,
                     data: DeleteUser,
                     message: "Delete cart book succefully"
              })
       } catch (err) {
              return NextResponse.json({
                     success: false,
                     message: "deletion not done ",
                     err,
              })
       }
}