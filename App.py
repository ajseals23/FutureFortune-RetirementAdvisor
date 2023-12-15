from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)

# Load Excel data
try:
    life_expectancy_data = pd.read_excel("Life Expectancy Excel.xlsx")
    asset_allocation_data = pd.read_excel("Asset Allocation Excel.xlsx")
except Exception as e:
    app.logger.error(f"Failed to load Excel files: {e}")

RETIREMENT_AGE = 63

def calculate_years_to_retirement(age):
    return RETIREMENT_AGE - age

def retrieve_life_expectancy(age, gender):
    if gender.upper() == "M":
        return life_expectancy_data["Life Expectancy"].iloc[age]
    elif gender.upper() == "F":
        return life_expectancy_data["Life Expectancy2"].iloc[age]

def get_asset_allocation(years_to_retirement):
    allocation = asset_allocation_data[asset_allocation_data['Years to Retirement'] == years_to_retirement]
    if not allocation.empty:
        return allocation.iloc[0].to_dict()
    return "No allocation found for these retirement years"

@app.route('/retirement_info', methods=['POST'])
def retirement_info():
    data = request.json
    app.logger.info(f"Received data: {data}")
    age = int(data.get('age'))
    gender = data.get('gender')
    years_to_retirement = calculate_years_to_retirement(age)
    life_expectancy = retrieve_life_expectancy(age, gender)
    asset_allocation = get_asset_allocation(years_to_retirement)
    return jsonify({
        "years_to_retirement": years_to_retirement,
        "life_expectancy": life_expectancy,
        "asset_allocation": asset_allocation
    })

if __name__ == '__main__':
    app.run(debug=True)


