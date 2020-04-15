import { useEffect, useState, useReducer } from 'react';


const DataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return { 
                ...state,
                isLoading: true,
                isError: false
             };
        case 'FETCH_SUCCESS':
            return { 
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
             }
        case 'FETCH_FAILURE':
            return { 
                ...state,
                isLoading: false,
                isError: false
             }
        default:
            throw new Error("Dispatch action failed");
    }
}


const FetchHits = (initialUrl, initialData) => {
  const [state, dispatch] = useReducer(
      DataFetchReducer,
      {
          isLoading: false,
          isError:false,
          data: initialData
      }
  )

  const [url, setUrl] = useState(initialUrl);
  useEffect( () => {
      let didCancel = false;
      
    const getResult = async () => {
        dispatch({type: 'FETCH_INIT'});
        try {
        const response = await fetch(url);
        const hits = await response.json();
        if(!didCancel){
            dispatch({type: 'FETCH_SUCCESS', payload : hits});    
        }
        
      } catch (error) {
          if(!didCancel) {
            dispatch({type: 'FETCH_FAILURE'});
          }
      }
    }
    getResult();
    return () => {
        didCancel = true;
    }
  },[url]);
    return [state, setUrl];
}


export default FetchHits;