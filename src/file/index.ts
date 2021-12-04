import {Router} from "express";
//@ts-ignore
import s3Proxy from 's3-proxy'
import aws from 'aws-sdk'

export const rFile = Router();

const AWS_ACCESS_KEY =  process.env.AWS_SECRET_ACCESS_KEY
const AWS_ACCESS_ID =  process.env.AWS_ACCESS_KEY_ID
// const AWS_REGION =  process.env.AWS_REGION
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME

rFile.get('/*', s3Proxy({
    bucket: AWS_BUCKET_NAME,
    accessKeyId: AWS_ACCESS_ID,
    secretAccessKey: AWS_ACCESS_KEY,
    overrideCacheControl: 'max-age=100000',
    // defaultKey: 'index.html'
}));
//test
// rFile.get('/', (_, res) => res.send('File module is not configured!'))

// Router
export default rFile
