from .routes import router
from flask import Flask
from flask_cors import CORS
from .config.server import PORT

app = Flask(__name__)
CORS(app)


app.register_blueprint(router)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6000)
