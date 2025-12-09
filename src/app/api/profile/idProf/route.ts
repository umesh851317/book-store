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
              const newDocument = await db.document.create({
                     data: {
                            documentNumber: data.idNum,
                            userId: data.userId,
                            documentType: data.idProf,
                            name: data.name,
                     },
              });
              return NextResponse.json({
                     success: true,
                     message: "document add succefully ",
                     data: newDocument,
              });

       } catch (error) {
              console.error(error);
              return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
       }
}

export async function GET(req: NextRequest) {
       const user_Id = req.cookies.get("userId")?.value;
       try {

              if (!user_Id) {
                     return NextResponse.json({
                            success: false,
                            message: "please login first",
                            user_Id
                     });
              }

              const response = await db.document.findFirst({
                     // where: { userId: "690cba95e58b0319446d47a1" },
                     where: { userId: user_Id }
              });

              return NextResponse.json({
                     success: true,
                     data: response,
                     message: "Document data get succefully"
              });
       } catch (err) {
              console.log("something wrong");
       }
}


export async function PUT(req: NextRequest) {
       const data = await req.json(); // updated data which is passed from frontend in data form
       const url = new URL(req.url);
       const id = url.searchParams.get("id") as string;  // addressedId
       const userId = req.cookies.get("userId")?.value;
       try {
              const UpdateDocument = await db.document.update({
                     where: { id: id },

                     data: {
                            documentNumber: data.idNum,
                            userId: data.userId,
                            documentType: data.idProf,
                            name: data.name,
                     },
              })
              return NextResponse.json({
                     success: true,
                     data: UpdateDocument,
                     message: " document updaate succefully"
              })
       } catch (err) {
              return NextResponse.json({
                     success: false,
                     message: "Something wrong",
                     err,
              })
       }
}
