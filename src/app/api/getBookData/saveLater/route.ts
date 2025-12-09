import { NextRequest, NextResponse } from "next/server";
import Cookie from "js-cookie";
import { db } from "../../../../../db/conenct";
export async function PUT(req: NextRequest) {
       // const data = await req.json(); // updated data which is passed from frontend in data form
       const url = new URL(req.url);
       const cartId = url.searchParams.get("cartId") as string;  // cartId
       const saveLaters = (url.searchParams.get("savelater") as string) == "true" ? true : false;  // saveLater
       const userId = req.cookies.get("userId")?.value;
       try {
              const updateUser = await db.cart.update({
                     where: { id: cartId },

                     data: {
                            saveLater: !saveLaters
                     },
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