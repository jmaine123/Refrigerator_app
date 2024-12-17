import { useState } from "react";


function SelectedRecipeIngred({selectedIngreds, selectedSteps}) {

    const [showIngreds, setShowIngreds] = useState("steps");

    let ingredList=selectedIngreds.map((ingredient,index)=>{
        return <li className="ingredItem" key={index}>{ingredient}</li>
    });

    let stepsList=selectedSteps.map((step,index)=>{
        return <li className="stepItem" key={index}>{step}</li>
    });

    const displayIngreds = (e) =>{
        let value = e.target.getAttribute("value");
        setShowIngreds(value)
    }


  return (
    <div>
        <div>
            <ol className="changeDisplay">
                <li className={`${showIngreds === "ingredients"? "selected": ""}`} onClick={displayIngreds} value={"ingredients"}>Ingredients</li>
                <li className={`${showIngreds === "steps"? "selected": ""}`} onClick={displayIngreds} value={"steps"}>Steps</li>
            </ol>
        </div>
        <div className="recipeOptions">
            <ul className={`ingredList ${showIngreds === "ingredients"? "showList": "hideList"}`}>
                {ingredList}               
            </ul>
            <ol className={`stepList ${showIngreds === "steps"? "showList": "hideList"}`}>
                {stepsList}               
            </ol>
        </div>
    </div>
  )
}

export default SelectedRecipeIngred