import React, { useState } from 'react';
import SelectedRecipeIngred from './SelectedRecipeIngred';

function RecipeList({allRecipes, time, course}) {
    let filteredRecipe = allRecipes.filter((recipe) => recipe.course === course && recipe.time === time);
    console.log(filteredRecipe);

    const [recipeDetails, setRecipeDetails] = useState({
        title: " ",
        ingredients: [],
        steps: []
      });

    const updateSelectedRecipe = (e) =>{
        let recipeTitle = e.target.getAttribute("value");
        let recipeIngreds = e.target.getAttribute("ingreds").split(",");
        let recipeSteps = e.target.getAttribute("steps").split(",");
        console.log(recipeIngreds);
        setRecipeDetails({
            title: recipeTitle,
            ingredients: recipeIngreds,
            steps: recipeSteps
        });
    }

    let recipeList=filteredRecipe.map((recipe,index)=>{
        return <li className="recipeList" onClick={updateSelectedRecipe} key={index} value={recipe.title} ingreds={recipe.ingredients} steps={recipe.steps} >{recipe.title}</li>
    })


  return (
    <div>
        <ul>{recipeList}</ul>
        <h3>How to make: {recipeDetails.title}</h3>
        <SelectedRecipeIngred selectedIngreds={recipeDetails.ingredients} selectedSteps={recipeDetails.steps} />
    </div>
  )
}

export default RecipeList
