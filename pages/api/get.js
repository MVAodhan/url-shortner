import { useRedis } from '../../utils/useRedis';

export default async function handler(req, res) {
  const redis = useRedis();
  const links = await redis.hgetall('links');
  res.status(200).send({ links });
}
