import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();

        const month = data.get('month');
        const year = data.get('year');
        const platform = data.get('platform');
        const file = data.get('excelFile');

        // Convert the file to a buffer
        if (file instanceof File) {
            const arrayBuffer = await file?.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);


            // Read the workbook from the buffer
            const workBook = XLSX.read(buffer, { type: 'buffer' });
            const sheetName = workBook.SheetNames[0];
            const workSheet = workBook.Sheets[sheetName];

            const json = XLSX.utils.sheet_to_json(workSheet);

            console.log("Json Format", json[0]);

            // for(let i = 0; i < json.length; i++) {
            //     await db
            // }

            console.log(year);
            console.log(platform);
            console.log(month);

            return NextResponse.json({ message: "Got Data", data: json }, { status: 200 });
        } else {
            throw new Error("Invalid File Type");
        }
    } catch (error: any) {
        console.error("Error reading file:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
