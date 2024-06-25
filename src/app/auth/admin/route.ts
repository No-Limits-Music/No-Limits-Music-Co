import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// Define an interface to describe the structure of each object in the JSON array
interface ExcelData {
    country: string;
    label: string;
    Main_Label: string;
    Sub_Label: string;
    product: string;
    uri: string;
    ean: number;
    isrc: string;
    song_name: string;
    artist_name: string;
    composer_name: string;
    album_name: string;
    total: number;
    file_name: string;
    royality: number;
}

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

            // Parse the sheet into JSON array and typecast it
            const json: ExcelData[] = XLSX.utils.sheet_to_json<ExcelData>(workSheet);

            const firstEntry: ExcelData = json[0];

            // Log properties of the first entry
            for (const key in firstEntry) {
                if (Object.prototype.hasOwnProperty.call(firstEntry, key)) {
                    if (firstEntry[key as keyof ExcelData] === "(blank)") {
                        console.log(`${key}: ${null}`)
                    }
                    console.log(`${key}: ${firstEntry[key as keyof ExcelData]}`);
                }
            }

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
