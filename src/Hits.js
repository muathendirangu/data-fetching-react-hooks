import { useEffect, useState } from 'react';

const getHits = (initialUrl, initialData) => {
    const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(initialUrl);
  useEffect( () => {
    setIsError(false)
    setIsLoading(true);
    const getResult = async () => {
      try {
        const response = await fetch(url);
        const hits = await response.json();
        setData(hits); 
      } catch (error) {
         setIsError(true)
      }
       
       
        setIsLoading(false);
    }
    getResult()
  },[url]);
    return [{data, isLoading, isError}, setUrl];
}


export default getHits;