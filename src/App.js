import React, { useState } from 'react';
import Api from './FetchHits';


function App() {
  const [query, setQuery] = useState('redux');
  const [{data, isLoading, isError}, fetchUrl] = Api(
    'https://hn.algolia.com/api/v1/search?query=redux',
    {hits: [] },
  );

  return (
    <>
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <button
      type="button"
      onClick={() => {fetchUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)}}
    > Search </button>
    {isError && <div>Something went wrong...</div> }
    {isLoading ? (
      <div>Loading ...</div>
      ) : (
   <ul>
     {
       data.hits.map(item => (
         <li key={item.objectID}>
           <a href={item.url}>{item.title}</a>
         </li>
       ))
     }
   </ul>
    )}
   </>
  )
}

export default App;
