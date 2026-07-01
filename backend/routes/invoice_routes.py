from flask import Blueprint, request, jsonify
from uuid import uuid4

try:
    from .auth_routes import token_required
    from ..db import get_connection
except ImportError:
    from routes.auth_routes import token_required
    from db import get_connection

invoice_bp = Blueprint('invoice_bp', __name__)


@invoice_bp.route('/', methods=['GET'])
@token_required
def get_invoices():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        '''
        SELECT
            invoice_id,
            reservation_id,
            reference_code,
            guest_id,
            guest_email,
            invoice_type,
            subtotal,
            final_total,
            balance_due,
            total_paid,
            payment_option,
            status,
            created_at,
            updated_at
        FROM invoices
        ORDER BY created_at DESC
        LIMIT 20
        '''
    )
    invoices = [format_invoice(invoice) for invoice in cursor.fetchall()]
    cursor.close()
    conn.close()
    return jsonify(invoices)


@invoice_bp.route('/', methods=['POST'])
@token_required
def create_invoice():
    data = request.json or {}
    amount = data.get('final_total') or data.get('amount') or 0
    total_paid = data.get('total_paid') or 0
    balance_due = data.get('balance_due')
    if balance_due is None:
        balance_due = float(amount) - float(total_paid)

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        '''
        INSERT INTO invoices (
            reservation_id,
            reference_code,
            guest_id,
            guest_email,
            invoice_type,
            subtotal,
            vat_amount,
            discount_applied,
            final_total,
            balance_due,
            total_paid,
            payment_option,
            status,
            notes
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ''',
        (
            data.get('reservation_id', 0),
            data.get('reference_code') or data.get('invoice_number') or uuid4().hex[:8].upper(),
            data.get('guest_id', 0),
            data.get('guest_email') or data.get('guest_name') or 'guest@example.com',
            data.get('invoice_type', 'room'),
            data.get('subtotal') or amount,
            data.get('vat_amount', 0),
            data.get('discount_applied', 0),
            amount,
            balance_due,
            total_paid,
            data.get('payment_option') or data.get('payment_method'),
            data.get('status', 'pending'),
            data.get('notes'),
        )
    )
    cursor.close()
    conn.close()
    return jsonify({'message': 'Invoice created'}), 201


@invoice_bp.route('/<int:invoice_id>', methods=['PUT'])
@token_required
def update_invoice(invoice_id):
    data = request.json or {}
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        '''
        UPDATE invoices
        SET status = %s,
            payment_option = %s,
            balance_due = %s,
            total_paid = %s
        WHERE invoice_id = %s
        ''',
        (
            data.get('status', 'pending'),
            data.get('payment_option') or data.get('payment_method'),
            data.get('balance_due', 0),
            data.get('total_paid', 0),
            invoice_id,
        )
    )
    cursor.close()
    conn.close()
    return jsonify({'message': 'Invoice updated'})


def format_invoice(invoice):
    return {
        **invoice,
        'id': invoice['invoice_id'],
        'invoice_number': invoice['reference_code'],
        'guest_name': invoice['guest_email'],
        'amount': invoice['final_total'],
        'due_date': invoice['created_at'],
        'payment_method': invoice['payment_option'],
        'receivable_status': 'open' if float(invoice['balance_due'] or 0) > 0 else 'settled',
    }
