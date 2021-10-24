from typing import Any


class non_negative_int(int):
    @classmethod
    def __get_validators__(cls) -> Any:
        yield cls.validate

    @classmethod
    def __modify_schema__(cls, field_schema: Any) -> None:
        field_schema.update(
            example=0,
        )

    @classmethod
    def validate(cls, v: Any) -> Any:
        if not isinstance(v, int):
            try:
                v = int(v)
            except Exception:
                raise TypeError("Int required")

        if v < 0:
            raise ValueError("PositiveInt required")
        return v
