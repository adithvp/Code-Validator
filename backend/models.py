from typing import List

from pydantic import BaseModel, Field, field_validator


SUPPORTED_LANGUAGES = {"python", "javascript", "typescript", "java", "cpp", "go", "rust"}


class ValidateRequest(BaseModel):
    code: str = Field(..., min_length=1, max_length=50000)
    language: str = Field(..., min_length=2, max_length=32)

    @field_validator("language")
    @classmethod
    def validate_language(cls, value: str) -> str:
        normalized = value.lower().strip()
        if normalized not in SUPPORTED_LANGUAGES:
            raise ValueError(f"Unsupported language: {value}")
        return normalized


class ValidationErrorItem(BaseModel):
    error_type: str
    error_message: str
    line_number: int | str
    severity: str
    suggested_fix: str


class ValidateResponse(BaseModel):
    errors: List[ValidationErrorItem] = Field(default_factory=list)
    optimized_code: str = ""
