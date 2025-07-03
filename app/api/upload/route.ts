import { NextRequest, NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const container = process.env.AZURE_STORAGE_CONTAINER;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const sas = process.env.AZURE_STORAGE_SAS_TOKEN; // Optional: if using SAS

if (!account || !container) {
  throw new Error('Azure storage environment variables are not set.');
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Read file as Buffer (Node.js only)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let blobServiceClient;
    if (sas) {
      blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net?${sas}`
      );
    } else {
      let connStr = process.env.AZURE_STORAGE_CONNECTION_STRING;
      if (!connStr && account && accountKey) {
        connStr = `DefaultEndpointsProtocol=https;AccountName=${account};AccountKey=${accountKey};EndpointSuffix=core.windows.net`;
      }
      if (!connStr) {
        return NextResponse.json({ error: 'No Azure connection string or account key' }, { status: 500 });
      }
      blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
    }

    const containerClient = blobServiceClient.getContainerClient(container as string);
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);
    await blockBlobClient.uploadData(buffer);

    const url = blockBlobClient.url;
    return NextResponse.json({ url });
  } catch (err) {
    console.error('Azure upload error:', err);
    return NextResponse.json({ error: 'Upload failed', details: (err as any).message }, { status: 500 });
  }
} 