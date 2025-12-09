import { NextRequest, NextResponse } from "next/server";
import Cookie from "js-cookie";
import { db } from "../../../../../db/conenct";

export async function GET(req: NextRequest) {
       // const data = await req.json();
       const url = new URL(req.url);
       const bookId = url.searchParams.get("bookId");
       // const userId = req.cookies.get("userId")?.value;
       if (!bookId) {
              return NextResponse.json(
                     { success: false, message: "Book ID not provided" },
                     { status: 400 }
              );
       }
       try {
              const response = await db.addBook.findFirst({
                     where: { id: bookId },
              });
              return NextResponse.json({
                     success: true,
                     data: response,
                     message: "book details are succefully fetched."
              });
       } catch (err) {
              console.error("Error fetching book details:", err);
              return NextResponse.json(
                     { success: false, message: "Server error" },
                     { status: 500 }
              );
       }
}