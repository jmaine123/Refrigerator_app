from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from lxml import etree, html
import time
import requests
import re
import pandas as pd
import requests
import json
import time
from selenium.webdriver.common.by import By
from dataclasses import dataclass, asdict
from gspread_dataframe import set_with_dataframe
import gspread as gs
from tqdm import tqdm
from threading import Thread



@dataclass
class RecipeDetails:
    title: str
    ingredients: list[str]
    steps: list[str]
    time: str
    course: str


# url = 'https://recipesdirect.com/recipe/beer-chicken-tacos'
main_list = []
main_categories = ['main-courses', 'apps-and-snacks', 'side-dishes', 'soups-and-salads', 'breakfast-and-brunch', 'desserts', 'drinks']



class Scraper():
    # def get_category(self, arr):
    #     url_start = 'https://recipesdirect.com/category/' 
    #     for cat in arr:
    #         category_links.append(f'{url_start}{cat}')
            
            
    def get_recipe_links(self, cat_link, category):
        next_page = True
        current_category = category
        page = 1
        while next_page:
            full_link = f'{cat_link}?page={page}'
            print(full_link)
            driver = webdriver.Chrome()
            driver.get(full_link)
            soup = BeautifulSoup(driver.page_source, "html.parser")
            s = soup.prettify()
            # print(s)
            dom = etree.HTML(str(soup))
            recipe_links = dom.xpath('//img[@alt="recipe image"]/../../@href')
            
            for rec_link in tqdm(recipe_links):
                recipe_links_arr.append(f'https://recipesdirect.com{rec_link}')
                self.get_info(f'https://recipesdirect.com{rec_link}', current_category)
            
            next_arrow = dom.xpath('//a[text()=">"]/text()')
            
            if page == 15:
                next_page = False
            elif next_arrow:
                print(next_arrow)
                page +=1    
            else:
                next_page = False
            driver.close()
            
            
        
    def get_info(self, url, curr_category):
        driver = webdriver.Chrome()
        print(f'starting: {url}')
        # driver.maximize_window()
        driver.get(url)
        # time.sleep(3)
        # driver.refresh()
        # driver.close()
        soup = BeautifulSoup(driver.page_source, "html.parser")
        s = soup.prettify() 
        # print(s)
        dom = etree.HTML(str(soup))
        try:
            title = dom.xpath('//div[@id="main-content"]/div[1]/div/h1/text()')[0]
        except:
            title = None
        try:
            time = dom.xpath('//div[@id="main-content"]/div[1]/div/descendant::span[text()="Time:"]/../span[2]/text()')[0]
        except:
            time = None
        try:
            ingred_list = dom.xpath('//div[@id="recipe-ingredients"]/ul/li[contains(@class,"list-disc")]/text()')
        except:
            ingred_list = None
        try:
            step_list = dom.xpath('//h2[text()="Directions"]/following-sibling::p/text()')
        except:
            step_list = None
    
                    
        recipe = RecipeDetails(
            title=title,
            time=time,
            ingredients=ingred_list,
            steps=step_list,
            course=curr_category
        )
        
        main_list.append(asdict(recipe))
        print('end')
        driver.close()
        
        

def main():
    threads = []
    for cat in main_categories:
        url_start = 'https://recipesdirect.com/category/'
        category_link = f'{url_start}{cat}'
        project = Scraper()
        
        t = Thread(target=project.get_recipe_links, args=(category_link, cat))
        t.start()
        threads.append(t)
        
        for t in threads:
            t.join()
        
        # project.get_category(main_categories)
        
        # Using categories to get recipe links and page info without threading
        # project.get_recipe_links(category_link, cat)
        
    print(main_list)
    df = pd.DataFrame(main_list)
    df.to_excel('recipes.xlsx',index=False)
    df.to_json('recipe.json', orient="records")



if __name__ == "__main__":
    main()