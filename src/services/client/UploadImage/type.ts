import S3 from "aws-sdk/clients/s3";

export type UploadImageData = {
  url: string;
  filename: string;
  fields: S3.PresignedPost.Fields;
};
