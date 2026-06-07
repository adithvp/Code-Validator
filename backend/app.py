import logging
from pathlib import Path

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from routes.validate import router as validate_router

load_dotenv(Path(__file__).with_name(".env"))

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)

app = FastAPI(
    title="AI Code Validator API",
    version="1.0.0",
    description="Code validation and optimization API powered by Gemini 2.5 Flash",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ValidationError)
async def pydantic_validation_exception_handler(_, exc: ValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": "Invalid request payload", "errors": exc.errors()},
    )


@app.get("/health")
async def health_check():
    return {"status": "ok"}


app.include_router(validate_router)


if __name__ == "__main__":
    uvicorn.run("app:app", host="host_no", port=portno, reload=False)
