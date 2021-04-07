import React, { useReducer, useEffect, useState, useCallback, useMemo } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import useHttpHooks from '../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
}


const  Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const  { isLoading, data, error, sendRequest, reqExtra, reqIdentifier, clear} = useHttpHooks();
  //const [ingredients, setIngredients] = useState([]);
  /* const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(); */

/*   useEffect(() => {
    fetch('https://react-hooks-update-79207-default-rtdb.firebaseio.com/ingredients.json')
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
        setIngredients(loadedIngredient);
      });
  }, []); */

  useEffect(() => {
    console.log('RERENDER INGREIDENTS', ingredients);
    if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({type:'DELETE', id: reqExtra});
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatch({type:'ADD', ingredient: {id: data.name, ...reqExtra}})
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    //setIngredients(filteredIngredients);
    dispatch({type:'SET', ingredients: filteredIngredients});
  }, []);

  const removeIngredientHandler = useCallback((id) => {
    sendRequest(
      `https://react-hooks-update-79207-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      'DELETE',
      null,
      id,
      'REMOVE_INGREDIENT'
    );
    //setIsLoading(true);
    /* dispatchHttp({type: 'SEND'});
    fetch(`https://react-hooks-update-79207-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then(response => {
      //setIsLoading(false);
      dispatchHttp({type: 'RESPONSE'});
      dispatch({type:'DELETE', id: id});
      //setIngredients(prevIngredient => prevIngredient.filter(ingredient => ingredient.id !== id));
    }).catch(err => {
      //setError('Something went wrong!!');
      //setIsLoading(false);
      dispatchHttp({type: 'ERROR', errorMessage: err.message});
    }); */
  }, [sendRequest]);
  const addIngredientHandler = useCallback((ingredient) => {
    sendRequest(
      `https://react-hooks-update-79207-default-rtdb.firebaseio.com/ingredients.json`,
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
    //setIsLoading(true);
   /*  dispatchHttp({type: 'SEND'});
    fetch('https://react-hooks-update-79207-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}
    }).then(response => {
      //setIsLoading(false);
      dispatchHttp({type: 'RESPONSE'});
      return response.json();
    }).then(responseData => {
      dispatch({type:'ADD', ingredient: {
        id: responseData.name,
        ...ingredient
      }}); */
     /*  setIngredients(prevIngredient => [
        ...prevIngredient,
        {
          id: responseData.name,
          ...ingredient
        }
      ]); */
   /*  });   */
  }, [sendRequest]);

  const clearErrors = useCallback(() => {
    //setError(null);
    //dispatchHttp({type: 'CLEAR'});
    clear();
  }, []);
  
  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
  }, [ingredients, removeIngredientHandler]);

  return (
    <div className="App">
      { error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm  
        onAddIngredient={addIngredientHandler} 
        loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        { ingredientList }
      </section>
    </div>
  );
}

export default Ingredients;
