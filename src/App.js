import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState({hits:[]});
  const [query, setQuery] = useState('');
  useEffect( () => {
    const getResult = async () => {
        const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
        const hits = await response.json();
        setData(hits)
    }
    getResult()
  },[query]
  )

  return (
    <>
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
   <ul>
     {
       data.hits.map(item => (
         <li key={item.objectID}>
           <a href={item.url}>{item.title}</a>
         </li>
       ))
     }
   </ul>
   </>
  )
}

export default App;
