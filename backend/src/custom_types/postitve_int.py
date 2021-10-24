from typing import Any


class positive_int(int):
    @classmethod
    def __get_validators__(cls) -> Any:
        yield cls.validate

    @classmethod
    def __modify_schema__(cls, field_schema: Any) -> None:
        field_schema.update(
            example=1,
        )

    @classmethod
    def validate(cls, v: Any) -> Any:
        if not isinstance(v, int):
            try:
                v = int(v)
            except Exception:
                raise TypeError("Int required")

        if v < 1:
            raise ValueError("PositiveInt required")
        return v
