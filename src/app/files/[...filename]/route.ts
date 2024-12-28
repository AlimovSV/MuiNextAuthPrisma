import fs from 'fs';
import { readFile } from 'fs/promises';
import mime from 'mime-types';

type Props = {
  params: Promise<{
    filename: string[];
  }>;
};

export async function GET(_request: Request, props: Props) {
  const params = await props.params;
  const filename = params.filename;
  const uploadDir = process.env.PAYLOAD_UPLOADS_DIR!;
  const filePath = `${uploadDir}/${filename.join('/')}`;

  if (!fs.existsSync(filePath)) {
    return new Response('File not found', { status: 404 });
  }

  const bytes = await readFile(filePath);
  const mimeType = mime.lookup(filePath) || 'application/octet-stream';

  // read file from file system
  return new Response(bytes, {
    headers: {
      'Content-Type': mimeType,
    },
  });
}
