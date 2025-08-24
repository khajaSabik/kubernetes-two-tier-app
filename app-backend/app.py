from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "<h2>Backend is UP ✅</h2><p>Use /add or /reverse endpoints for operations.</p>"

@app.route('/add')
def add_numbers():
    try:
        num = request.args.get('num')
        val = request.args.get('val')
        if num is None or val is None:
            return jsonify({"error": "Please provide 'num' and 'val' query parameters."}), 400
        result = int(num) + int(val)
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/reverse')
def reverse_number():
    try:
        num = request.args.get('num')
        if num is None:
            return jsonify({"error": "Please provide 'num' query parameter."}), 400
        reversed_num = str(num)[::-1]
        return jsonify({"result": reversed_num})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
