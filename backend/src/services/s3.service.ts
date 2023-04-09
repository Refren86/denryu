import S3 from 'aws-sdk/clients/s3';
import { UploadedFile } from 'express-fileupload';

import { s3Data } from '../config/s3.enum';
import { buildFileName } from '../helpers/files';

const {
  S3_ACCESS_KEY,
  S3_BUCKET_NAME,
  S3_BUCKET_URL,
  S3_REGION,
  S3_SECRET_ACCESS_KEY,
  S3_USER_PASS,
  S3_USER_SIGN_IN_URL,
} = s3Data;

const s3bucket = new S3({
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY!,
    secretAccessKey: S3_SECRET_ACCESS_KEY!,
  },
});

class S3Service {
  s3bucket = new S3({
    region: S3_REGION,
    credentials: {
      accessKeyId: S3_ACCESS_KEY!,
      secretAccessKey: S3_SECRET_ACCESS_KEY!,
    },
  });

  async uploadPublicFile(
    fileToUpload: UploadedFile,
    itemType: string,
    itemId: string
  ) {
    console.log('File to upload >', fileToUpload);

    return s3bucket
      .upload({
        // access control list
        ACL: 'public-read', // for public url of the file (права доступу)
        Body: fileToUpload.data, // content
        Bucket: S3_BUCKET_NAME!,
        ContentType: fileToUpload.mimetype,
        Key: buildFileName(fileToUpload.name, itemType, itemId), // file path + file name
      })
      .promise();
  }
}

const s3Service = new S3Service();

export { s3Service };
