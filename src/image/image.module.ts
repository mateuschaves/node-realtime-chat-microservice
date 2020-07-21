import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

console.log(process.env.AWS_S3_BUCKET_NAME);
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Module({
  imports: [
    MulterModule.register({
      storage: multerS3({
        s3: s3,
        bucket: AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: function(request, file, cb) {
          cb(null, `${Date.now().toString()}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [ImageController],
})
export class ImageModule {}
