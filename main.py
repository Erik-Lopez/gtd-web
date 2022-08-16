from fastapi import FastAPI

app = FastAPI()

@app.get(
    path="/",
    summary="Main page."
)
async def main_page():
    return { "Hello": "World" }
