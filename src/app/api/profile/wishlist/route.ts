import { NextRequest, NextResponse } from "next/server";
import Cookie from "js-cookie";
import { db } from "../../../../../db/conenct";



export async function POST(req: NextRequest) {
       // const data = await req.json();
       const url = new URL(req.url);
       const bookId: any = url.searchParams.get("bookId");

       try {
              const userId = req.cookies.get("userId")?.value;
              if (!userId) {
                     return NextResponse.json({ success: false, message: "Please login first" }, { status: 401 });
              }

              const wishlist = await db.wishlist.create({
                     data: {
                            bookId: bookId,
                            userId: userId
                     },
              });


              return NextResponse.json({
                     success: true,
                     message: "Book is add in wish list",
                     data: wishlist,
              });

       } catch (error) {
              console.error(error);
              return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
       }
}

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

              const response = await db.wishlist.findFirst({
                     where: {
                            bookId: bookId,
                            userId: userId,
                     },
              });

              if (!response) {
                     return NextResponse.json({
                            success: true,
                            data: null,
                            message: "wishlist detail not found",
                     });
              }
              const book = await db.addBook.findUnique({
                     where: { id: response.bookId },
              });
              const fullData = {
                     ...response,
                     book,
              };

              return NextResponse.json({
                     success: true,
                     data: response,
                     message: "wishlist detail succefully", userId
              });
       } catch (err) {
              console.log("something wrong");
       }
}


export async function DELETE(req: NextRequest) {
       const url = new URL(req.url)
       const id = url.searchParams.get("bookId") as string;  // cartId
       try {
              const userId = req.cookies.get("userId")?.value;
              const DeleteUser = await db.wishlist.delete({
                     where: {
                            id: id
                     },
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