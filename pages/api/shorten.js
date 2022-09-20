import { getShort, setLinks } from '../../utils/getUtils';

export default async function handler(req, res) {
  const { longUrl } = req.body;
  if (!longUrl || longUrl.length <= 0) {
    res.status(400).json({ message: 'Error, url is invalif' });
    return;
  }
  let shortUrl = getShort(longUrl);

  let data = await setLinks('links', shortUrl, longUrl);
  res.status(200).send({ data });
}
