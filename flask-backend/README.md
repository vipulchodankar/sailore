# Sailor Flask-Backend

> This is a [Flask](https://flask.palletsprojects.com/en/1.1.x/) implementation of the backend written by [Amit Kenkre](https://github.com/D-coder2) for Sailor which was previously written in [Express.js](https://expressjs.com/) by [Vipul Chondankar](https://github.com/vipulchodankar)

**Follow the steps given below to run this locally**

1. Create a virtual environment either using [_conda_](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#activating-an-environment) or [_venv_](https://pypi.org/project/virtualenv/)

   > NOTE: Please use python 3.6

2. Activate the environment with `conda activate env_name` for conda or `source env_name/bin/activate` for venv
3. Install dependencies with `pip install -r requirements.txt`

4. Type the following commands in your console for flask

   - `export FLASK_APP=__init__.py`
   - `export FLASK_ENV=development`
   - `export FLASK_RUN_HOST=0.0.0.0`
   - `export FLASK_RUN_PORT=6000`

5. Finally to start the backend server type `flask run` in the console
