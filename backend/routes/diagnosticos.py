from fastapi import APIRouter, Depends, HTTPException
from services.firebase import db
from datetime import datetime, timezone
from pydantic import BaseModel
from typing import Optional

from auth.auth import verificar_token


router = APIRouter()


# ================================
# MODELO DIAGNOSTICO
# ================================

class Diagnostico(BaseModel):

    usuarioId: Optional[str] = None

    usuario: Optional[str] = "Usuario FitoLente"

    perfil: Optional[str] = "sin perfil"

    cultivo: str

    resultado: str

    confianza: float

    descripcion: str

    recomendacion: str

    imagenURL: Optional[str] = None


# ================================
# OBTENER DIAGNOSTICOS
# PROTEGIDO
# ================================

@router.get("/diagnosticos")
def obtener_diagnosticos(

    usuario=Depends(verificar_token)

):

    diagnosticos = []

    documentos = (

        db.collection("diagnosticos")
        .where(
            "usuarioId",
            "==",
            usuario["uid"]
        )
        .stream()

    )

    for documento in documentos:

        datos = documento.to_dict()

        datos["id"] = documento.id

        if "fecha" in datos:

            try:

                datos["fecha"] = (
                    datos["fecha"]
                    .isoformat()
                )

            except:

                pass

        diagnosticos.append(datos)

    return diagnosticos


# ================================
# GUARDAR DIAGNOSTICO
# PROTEGIDO
# ================================

@router.post("/diagnosticos")
def guardar_diagnostico(

    diagnostico: Diagnostico,

    usuario=Depends(verificar_token)

):

    datos = diagnostico.model_dump()

    # El UID SIEMPRE proviene del token
    datos["usuarioId"] = usuario["uid"]

    datos["fecha"] = datetime.now(
        timezone.utc
    )

    documento = (

        db.collection("diagnosticos")
        .add(datos)

    )

    return {

        "mensaje":
        "Diagnóstico guardado correctamente",

        "id":
        documento[1].id

    }


# ================================
# ELIMINAR DIAGNOSTICO
# PROTEGIDO
# ================================

@router.delete("/diagnosticos/{diagnostico_id}")
def eliminar_diagnostico(

    diagnostico_id: str,

    usuario = Depends(verificar_token)

):

    documento = (
        db.collection("diagnosticos")
        .document(diagnostico_id)
    )

    datos = documento.get()

    if not datos.exists:

        return {
            "mensaje": "Diagnóstico no encontrado"
        }

    diagnostico = datos.to_dict()

    if diagnostico["usuarioId"] != usuario["uid"]:

        return {
            "mensaje": "No autorizado"
        }

    documento.delete()

    return {
        "mensaje": "Diagnóstico eliminado correctamente"
    }
