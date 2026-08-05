from fastapi import Header, HTTPException
from firebase_admin import auth


def verificar_token(
    authorization: str = Header(None)
):

    if authorization is None:
        raise HTTPException(
            status_code=401,
            detail="No autorizado"
        )


    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Token inválido"
        )


    token = authorization.replace(
        "Bearer ",
        ""
    )


    try:

        usuario = auth.verify_id_token(token)

        return usuario


    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Token inválido"
        )
