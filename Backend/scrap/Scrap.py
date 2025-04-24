from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

url = "https://store.steampowered.com/charts/mostplayed/"

def ScrapeTopGames():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")

    driver = webdriver.Chrome(options=options)
    driver.get(url)

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "div._3sJkwsBQuiAc_i3VOWX4tv table tbody tr"))
    )

    soup = BeautifulSoup(driver.page_source, "html.parser")
    rows = soup.select("div._3sJkwsBQuiAc_i3VOWX4tv table tbody tr")

    results = []

    for row in rows:
        try:
            name = row.select_one("div._1n_4-zvf0n4aqGEksbgW9N").text.strip()
            href = row.select_one("a._2C5PJOUH6RqyuBNEwaCE9X")["href"]
            app_id = href.split("/app/")[1].split("/")[0]
            concurrent = row.select_one("td._3L0CDDIUaOKTGfqdpqmjcy").text.strip()

            results.append({
                "name": name,
                "app_id": app_id,
                "concurrent_players": concurrent
            })
        except Exception as e:
            print("Error en una fila:", e)

    driver.quit()
    return results
