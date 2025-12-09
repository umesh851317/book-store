import { NextRequest, NextResponse } from "next/server";
import Cookie from "js-cookie";
import { db } from "../../../../../db/conenct";


export async function POST(req: NextRequest) {
       const data = await req.json();
       try {
              const userId = req.cookies.get("userId")?.value;
              if (!userId) {
                     return NextResponse.json({ success: false, message: "Please login first" }, { status: 401 });
              }

              const newBook = await db.addBook.create({
                     data: {
                            title: data.title,
                            language: data.language,
                            pages: data.pages,
                            category: data.category,
                            about: data.about,
                            author: data.author,
                            image_link: data.image_link,
                            published_year: data.published_year,
                            price: data.price,
                            discount: data.discount,
                            rating: data.rating
                     },
              });


              return NextResponse.json({
                     success: true,
                     message: "Address saved successfully",
                     data: newBook,
              });

       } catch (error) {
              console.error(error);
              return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
       }
}



export async function GET(req: NextRequest) {
       try {
              const userId = req.cookies.get("userId")?.value;

              if (!userId) {
                     return NextResponse.json({
                            success: false,
                            message: "please login first",
                            userId
                     });
              }

              const response = await db.addBook.findMany({
                     // where: { id: userId },
              });

              return NextResponse.json({
                     success: true,
                     data: response,
                     message: "get User succefully", userId
              });
       } catch (err) {
              console.log("something wrong");
       }
}

export async function PUT(req: NextRequest) {
       const data = await req.json(); // updated data which is passed from frontend in data form
       const url = new URL(req.url);
       const bookId = url.searchParams.get("bookId") as string;  // addressedId
       const userId = req.cookies.get("userId")?.value;
       try {
              const updateUser = await db.addBook.update({
                     where: { id: bookId },

                     data: {
                            title: data.title,
                            language: data.language,
                            pages: data.pages,
                            category: data.category,
                            about: data.about,
                            author: data.author,
                            image_link: data.image_link,
                            published_year: data.published_year,
                            price: data.price,
                            discount: data.discount,
                            rating: data.rating
                     },
              })
              return NextResponse.json({
                     success: true,
                     data: updateUser,
                     message: "book updaate succefully"
              })
       } catch (err) {
              return NextResponse.json({
                     success: false,
                     message: "Something wrong",
                     err,
              })
       }
}

export async function DELETE(req: Request) {
       const url = new URL(req.url)
       const bookId = url.searchParams.get("bookId") as string
       try {
              const DeleteUser = await db.addBook.delete({
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
                     message: "Something wrong",
                     err,
              })
       }
}