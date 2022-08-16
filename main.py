from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get(
    path = "/",
    response_class = HTMLResponse,
    summary = "Main page."
)
async def main_page():
    with open("./static/main_page.html", "r") as f:
        content = f.read()
        return HTMLResponse(content)

@app.get(
    path = "/about",
    response_class = HTMLResponse,
    summary = "About me page."
)
async def about_me():
    with open("./static/about.html", "r") as f:
        content = f.read()
        return HTMLResponse(content)
