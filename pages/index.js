import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [links, setLinks] = useState();
  const urlRef = useRef('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({ longUrl: longUrl });

    await axios.post('/api/shorten', data, {
      headers: { 'Content-Type': 'application/json' },
    });

    urlRef.current.value = '';
    getLinks();
  };

  useEffect(() => {
    getLinks();
  }, []);

  const getLinks = () => {
    fetch('/api/get')
      .then((response) => response.json())
      .then((json) => setLinks(json.links));
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
                  <div>{`/go/${short}`}</div>
                  <div>{long}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
