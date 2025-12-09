import { NextRequest, NextResponse } from "next/server";
import Cookie from "js-cookie";
import { db } from "../../../../../db/conenct";


export async function GET(req: NextRequest) {
       const url = new URL(req.url);
       const category = url.searchParams.get("category") as string;  
       const userId = req.cookies.get("userId")?.value;

       try {
              const response = await db.addBook.findMany({
                     where: { category: category },
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