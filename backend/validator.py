import json
import logging
import os
from pathlib import Path
from typing import Any, Dict

from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

from models import ValidateResponse

logger = logging.getLogger(__name__)

load_dotenv(Path(__file__).with_name(".env"))

validation_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are an expert AI Code Validator and Optimizer.

Analyze the given code carefully.

Return ONLY valid JSON.

Tasks:
1. Detect syntax errors
2. Detect logical issues
3. Detect bad coding practices
4. Detect vulnerabilities
5. Detect performance issues
6. Suggest fixes
7. Generate fully corrected code

Response Format:

{{
  "errors": [
    {{
      "error_type": "",
      "error_message": "",
      "line_number": "",
      "severity": "",
      "suggested_fix": ""
    }}
  ],
  "optimized_code": ""
}}

Severity values:
- Low
- Medium
- High
- Critical

Do not explain outside JSON.
""",
        ),
        (
            "human",
            "Language: {language}\n\nCode:\n{code}",
        ),
    ]
)


def _extract_json(raw: str) -> Dict[str, Any]:
    cleaned = raw.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.strip("`")
        cleaned = cleaned.replace("json\n", "", 1).strip()

    start = cleaned.find("{")
    end = cleaned.rfind("}")
    if start == -1 or end == -1:
        raise ValueError("Model output did not contain JSON object.")
    candidate = cleaned[start: end + 1]
    return json.loads(candidate)


def _build_chain() -> Any:
    api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GOOGLE_API_KEY is missing. Add it to backend/.env")

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0,
        google_api_key=api_key,
    )
    return validation_prompt | llm | StrOutputParser()


async def run_validation(code: str, language: str) -> ValidateResponse:
    chain = _build_chain()
    raw_response = await chain.ainvoke({"code": code, "language": language})
    logger.debug("Raw model response: %s", raw_response[:5000])
    parsed = _extract_json(raw_response)
    return ValidateResponse.model_validate(parsed)
