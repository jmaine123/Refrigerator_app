from fastapi import FastAPI
import uvicorn
import json as _json

app = FastAPI()


@app.get("/")

async def root():
    with open('/Users/user/Desktop/refrig_recipe_app/recipe-server/recipe.json') as recipe_file:
        parsed_json = _json.load(recipe_file)
    return parsed_json


@app.get('/id/{id}')
def read_item(id: int):
    with open('/Users/user/Desktop/refrig_recipe_app/recipe-server/recipe.json') as recipe_file:
        parsed_json = _json.load(recipe_file)
    return parsed_json[id]

@app.get('/course/{course}')
def read_course(course: str):
    with open('/Users/user/Desktop/refrig_recipe_app/recipe-server/recipe.json') as recipe_file:
        parsed_json = _json.load(recipe_file)
    
    selected_arr = [recipe for recipe in parsed_json if recipe['course'] == course]
    return selected_arr

@app.get('/time/{time}')
def read_time(time: str):
    with open('/Users/user/Desktop/refrig_recipe_app/recipe-server/recipe.json') as recipe_file:
        parsed_json = _json.load(recipe_file)
    
    selected_arr = [recipe for recipe in parsed_json if recipe['time'] == time]
    return selected_arr
    