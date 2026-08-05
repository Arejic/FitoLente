import firebase_admin
from firebase_admin import credentials, firestore
import os


ruta = os.path.join(
    os.path.dirname(__file__),
    "../fitolente-9b607-firebase-adminsdk-fbsvc-b549bfe6f7.json"
)


cred = credentials.Certificate(ruta)


if not firebase_admin._apps:

    firebase_admin.initialize_app(
        cred
    )


db = firestore.client()
