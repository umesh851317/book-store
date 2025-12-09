import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db/conenct";

export async function POST(req: Request) {
    const data = await req.json();

    try {
        if (data) {
            const existUser = await db.user.findFirst({
                where: {
                    email: data.email
                }
            })

            if (existUser) {
                return NextResponse.json({
                    success: true,
                    message: "User already Exist",
                    error: "User with this email is already exist"
                })
            } else {

                const response = await db.user.create({
                    // data: data,
                    data: {
                        name: data.name,
                        email: data.email,
                        mobile: data.number,  
                        address: data.address,
                        password: data.password,
                    },
                });
                return NextResponse.json({
                    success: true,
                    // data: response,
                    message: "User register succefully"
                })
            }
        }
    }
    catch (error) {
        // alert("Something Wrong");
        return NextResponse.json({
            success: false,
            message: "Something Wrong",
            error: error
        });
    }
}


export async function GET(req: Request) {
    try {
        const response = await db.user.findMany();
        return NextResponse.json({
            success: true,
            data: response
        });
    } catch (err) {
        console.log("something wrong");
    }
}