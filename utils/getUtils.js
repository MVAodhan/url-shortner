import { useRedis } from './useRedis';

export const getShort = (longUrl) => {
  let urlSegments = longUrl.split('/');
  let slug = urlSegments[urlSegments.length - 1];
  let slugSubstrings = slug.split('-');
  let letters = [];
  for (let string of slugSubstrings) {
    letters = [...letters, ...string];
  }
  let newSlug = [];
  const allowedCharacters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i <= 5; i++) {
    let letter = allowedCharacters.charAt(
      Math.floor(Math.random() * allowedCharacters.length)
    );
    newSlug = [...newSlug, letter];
  }
  let newSlugJoin = newSlug.join('');
  let shortUrl = newSlugJoin;
  return shortUrl;
};

export async function getLink(code) {
  const redis = useRedis();

  let link = await redis.hget('links', code);

  return link;
}

export async function getLinks(hash) {
  const redis = useRedis();
  const links = await redis.hgetall(hash);
  return links;
}

export async function setLinks(hash, shortUrl, longUrl) {
  const redis = useRedis();
  const data = await redis.hset(hash, { [shortUrl]: longUrl });
  return data;
}
