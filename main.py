import uvicorn 

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

with open("./home_button.html") as f:
    home_button = f.read()

@app.get(
    path = "/",
    response_class = HTMLResponse,
    summary = "Main page."
)
async def main_page():
    with open("./static/main_page.html", "r") as f:
        content = f.read()
        return HTMLResponse(home_button + content)

@app.get(
    path = "/about",
    response_class = HTMLResponse,
    summary = "About me page."
)
async def about_me():
    with open("./static/about.html", "r") as f:
        content = f.read()
        return HTMLResponse(home_button + content)

@app.get(
    path = "/gtd",
    response_class = HTMLResponse,
    summary = "GTD main page."
)
async def gtd():
    with open("./static/gtd.html", "r") as f:
        content = f.read()
        return HTMLResponse(home_button + content)

@app.get(
    path = "/discord",
    response_class = HTMLResponse,
    summary = "Discord contact page."
)
async def discord():
    return HTMLResponse("<body style='font-family: Arial; font-size:3rem;'><p>Discord no permite crear invitaciones a perfiles así que te mando a esta página jasjtajst.</p><p>En fin, habla conmigo si quieres: <strong>Eriklf#4063</strong></p></body>")

if __name__ == '__main__':
    uvicorn.run('main:app', port=8001, host='0.0.0.0')
