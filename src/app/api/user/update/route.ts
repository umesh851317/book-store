import { NextResponse } from "next/server";
import { db } from "../../../../../db/conenct";

export async function PUT(req: Request) {
       const data = await req.json();
       try {
              const updateUser = await db.user.update({
                     where: {
                            email: data.email,
                     },
                     data: {
                            name: data.name,
                            email: data.email,
                            mobile: data.number,   
                            address: data.address,
                            password: data.password,
                     },

              })
              return NextResponse.json({
                     success: true,
                     data: updateUser,
                     message: "User updaate succefully"
              })
       } catch (err) {
              return NextResponse.json({
                     success: false,
                     message: "Something wrong",
                     err,
              })
       }
}



export async function GET(req: Request) {
       try {
              const response = await db.user.findMany();
              return NextResponse.json({
                     success: true,
                     data: response,
                     message: "get User succefully"
              });
       } catch (err) {
              console.log("something wrong");
       }
}


export async function DELETE(req: Request) {
       const data = await req.json();
       try {
              const DeleteUser = await db.user.delete({
                     where: {
                            email: data.email,
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