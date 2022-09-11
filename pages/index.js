import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [links, setLinks] = useState();
  const urlRef = useRef('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/shorten', { longUrl: longUrl });

    urlRef.current.value = '';
    await refreshLinks();
  };

  useEffect(() => {
    (async () => {
      await refreshLinks();
    })();
  }, []);

  const refreshLinks = async () => {
    const linksObject = await getLinks();
    setLinks(linksObject);
  };

  const getLinks = async () => {
    const res = await axios.get('/api/links');
    return res?.data?.links;
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Head>
        <title>Create Next App</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-auto flex flex-col content-center w-2/4 sm:w-4/5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="url" className="flex justify-center">
              Enter a url:{' '}
            </label>
            <input
              type="text"
              name="url"
              id="url"
              required
              ref={urlRef}
              onChange={() => setLongUrl(urlRef.current.value)}
              className="border border-black rounded"
            />
          </div>
        </form>
        <div>
          {links &&
            Object.keys(links).map((short) => {
              let long = links[short];
              return (
                <div key={short}>
                  <div>{`${process.env.NEXT_PUBLIC_HOST}/go/${short}`}</div>
                  <div>{long}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
