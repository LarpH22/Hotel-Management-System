import os

class Config:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    SECRET_KEY = os.environ.get('EUTELIA_SECRET_KEY', 'eutelia-secret-key')
    DB_HOST = os.environ.get('EUTELIA_DB_HOST', '127.0.0.1')
    DB_PORT = int(os.environ.get('EUTELIA_DB_PORT', '3307'))
    DB_USER = os.environ.get('EUTELIA_DB_USER', 'root')
    DB_PASSWORD = os.environ.get('EUTELIA_DB_PASSWORD', '')
    DB_NAME = os.environ.get('EUTELIA_DB_NAME', 'hotel_billing')
    JWT_ALGORITHM = 'HS256'
    JWT_EXPIRATION_SECONDS = 86400
