from flask import Blueprint, jsonify

try:
    from .auth_routes import token_required
    from ..db import get_connection
except ImportError:
    from routes.auth_routes import token_required
    from db import get_connection

report_bp = Blueprint('report_bp', __name__)


@report_bp.route('/summary', methods=['GET'])
@token_required
def report_summary():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT COUNT(*) AS total_invoices, SUM(total_paid) AS total_collections, SUM(balance_due) AS total_receivables FROM invoices')
    summary = cursor.fetchone()
    cursor.execute('SELECT status, COUNT(*) AS count FROM invoices GROUP BY status')
    status_counts = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify({'summary': summary, 'status_counts': status_counts})
