import { NextRequest, NextResponse } from "next/server";
import Cookie from "js-cookie";
import { db } from "../../../../../db/conenct";


export async function POST(req: NextRequest) {
       const data = await req.json();
       try {
              // const userId = req.cookies.get("userId")?.value;
              // if (!userId) {
              //        return NextResponse.json({ success: false, message: "Please login first" }, { status: 401 });
              // }
              const datas = data.map((data: any) => ({
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
                     rating:data.rating
              })
              )

              console.log("data.....", data)
              const newBook = await db.addBook.createMany({
                     data: datas
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
