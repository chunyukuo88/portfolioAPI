import { Client } from 'redis-om';

// const url = process.env.REDIS_PUBLIC_DB;

export async function getClient() {
  // const client = await new Client().open(url);
  const client = await new Client().open(
    'redis://default:OKmUXxxoFcmCH042OIWb7f4fcHJkbYJy@redis-14990.c10.us-east-1-3.ec2.cloud.redislabs.com:14990',
  );
  return client;
}
