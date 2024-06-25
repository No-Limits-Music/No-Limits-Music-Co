import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// Define an interface to describe the structure of each object in the JSON array
interface ExcelData {
    country: string | null;
    label: string | null;
    Main_Label: string | null;
    Sub_Label: string | null;
    product: string | null;
    uri: string | null;
    upc: string | null;
    ean: string | null;
    isrc: string | null;
    song_name: string | null;
    artist_name: string;
    composer_name: string | null;
    album_name: string | null;
    total: string | null;
    file_name: string | null;
    royality: string | null;
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

            if (platform === "Spotify") {
                // Parse the sheet into JSON array and typecast it
                const json: ExcelData[] = XLSX.utils.sheet_to_json<ExcelData>(workSheet);

                // Append into Database according to the platform selected
                for (const entry of json) {
                    await db.spotifyMusic.create({
                        data: {
                            country: entry.country === "(blank)" ? null : entry.country,
                            label: entry.label === "(blank)" ? null : entry.label,
                            Main_Label: entry.Main_Label === "(blank)" ? null : entry.Main_Label,
                            Sub_Label: entry.Sub_Label === "(blank)" ? null : entry.Sub_Label,
                            product: entry.product === "(blank)" ? null : entry.product,
                            uri: entry.uri === "(blank)" ? null : entry.uri,
                            upc: entry.upc === "(blank)" ? null : entry.upc?.toString(),
                            ean: entry.ean === "(blank)" ? null : entry.ean?.toString(),
                            isrc: entry.isrc === "(blank)" ? null : entry.isrc,
                            song_name: entry.song_name === "(blank)" ? null : entry.song_name,
                            artist_name: entry.artist_name,
                            composer_name: entry.composer_name === "(blank)" ? null : entry.composer_name,
                            album_name: entry.album_name === "(blank)" ? null : entry.album_name,
                            total: entry.total === "(blank)" ? null : entry.total?.toString(),
                            file_name: entry.file_name === "(blank)" ? null : entry.file_name,
                            royality: entry.royality === "(blank)" ? null : entry.royality?.toString()
                        }
                    });
                }
            }

            return NextResponse.json({ message: "Data imported successfully" }, { status: 200 });
        } else {
            throw new Error("Invalid File Type");
        }
    } catch (error: any) {
        console.error("Error reading file:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
