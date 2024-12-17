import './App.css';
import Freezer from './Freezer';
import Pantry from './Pantry';
import Fridge from './Fridge';
import data from '/Users/user/Desktop/refrig_recipe_app/refrig_app/src/recipe.json';
import { useEffect, useState } from 'react';
import RecipesFilter from './RecipesFilter';


function App() {

//   const [ingredients, setIngrdients] = useState([]);
//   const [course, setCourse] = useState("main-course");
//   const [time, setTime] = useState("1 hour 30 minutes");

  const [recipeParams, setRecipeParams] = useState({
    course: 'main-course',
    time: '35 minutes'
  });
  const [itemLoc, setItemLoc] = useState("Freezer");


  const updateitemLoc = (e) =>{
    setItemLoc(e.target.value);
  }

  useEffect(() => {
    console.log("course has changed to " + recipeParams.course);
    console.log("time has been changed to " + recipeParams.time);

  },[recipeParams])

  return (
    <div className="App">
      <div className='main-content'>
        <div className="refrigerator">
            <Freezer/>
            <Fridge/>
            <Pantry/>
        </div>
        <RecipesFilter  data={data} recipeParams={recipeParams} setRecipeParams={setRecipeParams}/>
        <div className="add_groceries">
            <form>
                <input type="text" placeholder='Item'/>
                <label>
                Where are you adding your item:
                <select value={itemLoc} onChange={updateitemLoc}>
                    <option value="freezer">Freezer</option>
                    <option value="refrigerator">Refrigerator</option>
                    <option value="pantry">Pantry</option>
                </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
      </div>
    </div>
  );
}

export default App;
