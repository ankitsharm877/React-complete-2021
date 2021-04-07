import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [filter, setFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
        const query = filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`;
        fetch('https://react-hooks-update-79207-default-rtdb.firebaseio.com/ingredients.json' + query)
        .then(res => res.json())
        .then(resData => {
          const loadedIngredient = [];
          for (const key in resData) {
              loadedIngredient.push({
                id: key,
                title: resData[key].title,
                amount: resData[key].amount
              })
          }
          onLoadIngredients(loadedIngredient);
        });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, onLoadIngredients, inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
              type="text"
              ref={inputRef}
              value={filter} 
              onChange={event => setFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
