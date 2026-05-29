import logging
import time
from collections import defaultdict, deque
from typing import Deque, Dict

from fastapi import APIRouter, HTTPException, Request

from models import ValidateRequest, ValidateResponse
from validator import run_validation

logger = logging.getLogger(__name__)

router = APIRouter(tags=["validation"])

MAX_REQUESTS = 20
WINDOW_SECONDS = 60
request_buckets: Dict[str, Deque[float]] = defaultdict(deque)


def enforce_rate_limit(ip_address: str) -> None:
    now = time.time()
    window_start = now - WINDOW_SECONDS
    bucket = request_buckets[ip_address]

    while bucket and bucket[0] < window_start:
        bucket.popleft()

    if len(bucket) >= MAX_REQUESTS:
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. Please wait and retry.",
        )

    bucket.append(now)


@router.post("/validate", response_model=ValidateResponse)
async def validate_code(payload: ValidateRequest, request: Request) -> ValidateResponse:
    client_ip = request.client.host if request.client else "unknown"
    enforce_rate_limit(client_ip)

    try:
        return await run_validation(code=payload.code, language=payload.language)
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Validation failed")
        raise HTTPException(status_code=500, detail=f"Validation failed: {exc}") from exc
