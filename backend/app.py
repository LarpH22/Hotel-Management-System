import os

from flask import Flask, abort, send_from_directory
from flask_cors import CORS

try:
    from .config import Config
    from .routes.auth_routes import auth_bp
    from .routes.user_routes import user_bp
    from .routes.invoice_routes import invoice_bp
    from .routes.report_routes import report_bp
except ImportError:
    from config import Config
    from routes.auth_routes import auth_bp
    from routes.user_routes import user_bp
    from routes.invoice_routes import invoice_bp
    from routes.report_routes import report_bp

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIST_DIR = os.path.abspath(os.path.join(BASE_DIR, '..', 'frontend', 'dist'))
FRONTEND_ASSETS_DIR = os.path.join(FRONTEND_DIST_DIR, 'assets')

app = Flask(__name__, static_folder=FRONTEND_ASSETS_DIR, static_url_path='/assets')
app.config.from_object(Config)
CORS(app, supports_credentials=True)

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(user_bp, url_prefix='/api/users')
app.register_blueprint(invoice_bp, url_prefix='/api/invoices')
app.register_blueprint(report_bp, url_prefix='/api/reports')


@app.route('/favicon.svg')
def favicon():
    return send_from_directory(FRONTEND_DIST_DIR, 'favicon.svg')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path.startswith('api/'):
        abort(404)

    requested_file = os.path.join(FRONTEND_DIST_DIR, path)
    if path and os.path.isfile(requested_file):
        return send_from_directory(FRONTEND_DIST_DIR, path)

    index_path = os.path.join(FRONTEND_DIST_DIR, 'index.html')
    if os.path.isfile(index_path):
        return send_from_directory(FRONTEND_DIST_DIR, 'index.html')

    return (
        'Frontend build not found. Run "cd frontend" then "npm run build" and restart the backend.',
        503,
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
