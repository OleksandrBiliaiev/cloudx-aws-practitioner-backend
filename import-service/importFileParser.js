import AWS from 'aws-sdk'
import csv from 'csv-parser';

export const importFileParser = async (event) => {
  const BUCKET = 'aws-cloudx-bike-shop-product-import';
  const s3 = new AWS.S3({ region: 'us-east-1' });

  try {
    for (const record of event.Records) {
      const objectKey = record.s3.object.key;
      const s3Stream = s3.getObject({
        Bucket: BUCKET,
        Key: objectKey
      }).createReadStream();

      await new Promise((resolve) => {
        s3Stream
          .pipe(csv())
          .on('data', (data) => {
            console.log('CSV record:', data);
          })
          .on('end', async () => {
            await s3.copyObject({
              Bucket: BUCKET,
              CopySource: `${BUCKET}/${objectKey}`,
              Key: objectKey.replace('uploaded', 'parsed')
            }).promise();

            await s3.deleteObject({
              Bucket: BUCKET,
              Key: objectKey
            }).promise();

            resolve({
              statusCode: 200,
              body: JSON.stringify({ message: 'Csv file successfully received and parsed.' })
            })
          })
      })
    };
  } catch (error) {
    console.log(error);
  }
};
