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

              const newAddress = await db.address.create({
                     data: {
                            name: data.name,
                            mobile: data.mobile,
                            pinCode: data.pinCode,
                            locality: data.locality,
                            houseNo: data.houseNo,
                            city: data.city,
                            state: data.state,
                            landmark: data.landmark,
                            altMobile: data.altMobile,
                            userId: userId,
                     },
              });

              return NextResponse.json({
                     success: true,
                     message: "Address saved successfully",
                     data: newAddress,
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

              const response = await db.address.findMany({
                     where: { userId: userId },
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


export async function DELETE(req: Request) {
       const url = new URL(req.url)
       const addressId = url.searchParams.get("addressId") as string
       try {
              const DeleteUser = await db.address.delete({
                     where: {
                            id: addressId
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


export async function PUT(req: NextRequest) {
       const data = await req.json(); // updated data which is passed from frontend in data form
       const url = new URL(req.url);
       const addressId = url.searchParams.get("addressId") as string;  // addressedId
       const userId = req.cookies.get("userId")?.value;
       try {
              const updateUser = await db.address.update({
                     where: { id: addressId },

                     data: {
                            name: data.name,
                            mobile: data.mobile,
                            pinCode: data.pinCode,
                            locality: data.locality,
                            houseNo: data.houseNo,
                            city: data.city,
                            state: data.state,
                            landmark: data.landmark,
                            altMobile: data.altMobile,
                            userId: userId,
                     },
              })
              return NextResponse.json({
                     success: true,
                     data: updateUser,
                     message: "Address updaate succefully"
              })
       } catch (err) {
              return NextResponse.json({
                     success: false,
                     message: "Something wrong",
                     err,
              })
       }
}
