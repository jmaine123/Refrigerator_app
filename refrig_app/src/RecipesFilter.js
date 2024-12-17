
import RecipeList from './RecipeList';




export default function RecipesFilter({data, recipeParams, setRecipeParams}) {

    const allRecipes = data;

    
    const updateTime = (e)=>{
        let selected_time = e.target.value;
        console.log(selected_time);
        setRecipeParams({
            ...recipeParams,
            time: selected_time

    });

    }

    const updateCourse =(e)=>{
        let selected_course = e.target.value;
        console.log(selected_course);
        setRecipeParams({
            ...recipeParams,
            course: selected_course

    });
        
    }

    const uniqueTimes = () =>{
        const all_times = [];
        for (let i = 0; i < data.length; i++){
            let time = data[i].time != null && data[i].course === recipeParams.course? data[i].time.trim(): "";
            console.log(time);
            if (all_times.includes(time) === false && time != null){
                all_times.push(time.trim());
    
            }
    
        }

        all_times.sort();
        return (
            <select name="time" value={recipeParams.time} onChange={updateTime}>
              {
                all_times.map((time, idx) =>
                  <option key={idx} value={time}>
                    {time}
                  </option>
              )}
            </select>
          );

      }




  return (
    <div className='recipe_filter'>
        <form>
            <select name="course" value={recipeParams.course} onChange={updateCourse}>
                <option value="main-courses">Main Course</option>
                <option value="desserts">Dessert</option>
                <option value="drinks">Drinks</option>
                <option value="apps-and-snacks">Apps and Snacks</option>
                <option value="breakfast-and-brunch">Breakfast and Brunch</option>
                <option value="soups-and-salads">Soups and Salads</option>
            </select>
        </form>
        <form>
            {uniqueTimes()}
        </form>
        <h1>Recipes</h1>
        {/* <h4>{recipeParams.course}</h4>
        <h4>{recipeParams.time}</h4> */}
        <RecipeList allRecipes={allRecipes} time={recipeParams.time} course={recipeParams.course}/>
    </div>
  )
}
