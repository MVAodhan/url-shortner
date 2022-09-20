import { getShort } from '../../utils/getUtils';
import { useRedis } from '../../utils/useRedis';

export default async function handler(req, res) {
  const redis = useRedis();
  const { longUrl } = req.body;
  if (!longUrl || longUrl.length <= 0) {
    res.status(400).json({ message: 'Error, url is invalif' });
    return;
  }
  let shortUrl = getShort(longUrl);

  let data = await redis.hset('links', { [shortUrl]: longUrl });
  res.status(200).send({ data });
}
