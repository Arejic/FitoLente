from fastapi import APIRouter, UploadFile, File, Depends

from auth.auth import verificar_token
from services.supabase import supabase

import uuid


router = APIRouter()


@router.post("/imagenes")
async def subir_imagen(

    archivo: UploadFile = File(...),

    usuario=Depends(verificar_token)

):

    extension = archivo.filename.split(".")[-1]

    contenido = await archivo.read()

    nombre = (
        f"diagnosticos/"
        f"{usuario['uid']}/"
        f"{uuid.uuid4()}.{extension}"
    )

    supabase.storage.from_("imagenes").upload(

        nombre,

        contenido,

        {
            "content-type": archivo.content_type
        }

    )

    url = (
        supabase
        .storage
        .from_("imagenes")
        .get_public_url(nombre)
    )

    return {

        "imagenURL": url

    }
