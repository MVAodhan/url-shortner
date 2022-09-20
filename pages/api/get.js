import { getLinks } from '../../utils/getUtils';

export default async function handler(req, res) {
  const links = await getLinks('links');
  res.status(200).send({ links });
}
