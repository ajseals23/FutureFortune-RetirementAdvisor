import tkinter as tk
from tkinter import messagebox
import pandas as pd

# Load Excel Data
try:
    life_expectancy_data = pd.read_excel("Life Expectancy Excel.xlsx")
    asset_allocation_data = pd.read_excel("Asset Allocation Excel.xlsx")
except Exception as e:
    messagebox.showerror("Error", f"Failed to load Excel files: {e}")
    exit(1)

# Constants
RETIREMENT_AGE = 63  # Update if needed

# Function to calculate years to retirement
def calculate_years_to_retirement(age, retirement_age=RETIREMENT_AGE):
    return retirement_age - age

# Function to retrieve life expectancy from the data
def retrieve_life_expectancy(age, gender):
    try:
        column = "Life Expectancy" if gender == "M" else "Life Expectancy2"
        return life_expectancy_data[column].iloc[age]
    except Exception as e:
        return f"Error: {e}"

# Function to retrieve asset allocation
def get_asset_allocation(years_to_retirement):
    try:
        allocation = asset_allocation_data[asset_allocation_data['Years to Retirement'] == years_to_retirement]
        if not allocation.empty:
            return allocation.iloc[0].to_dict()
        return "No allocation found for these retirement years"
    except Exception as e:
        return f"Error in asset allocation retrieval: {e}"

# Submit button event handler
def on_submit():
    try:
        age = int(age_entry.get())
        gender = gender_var.get()
        if not gender:
            raise ValueError("Please select a gender")

        years_to_retirement = calculate_years_to_retirement(age)
        life_expectancy = retrieve_life_expectancy(age, gender)
        asset_allocation = get_asset_allocation(years_to_retirement)

        result_message = f"Years to retirement: {years_to_retirement}\n"
        result_message += f"Life Expectancy: {life_expectancy}\n"
        result_message += f"Asset Allocation: {asset_allocation}"
        messagebox.showinfo("Result", result_message)
    except ValueError as ve:
        messagebox.showerror("Error", f"Input Error: {ve}")
    except Exception as e:
        messagebox.showerror("Error", f"Unexpected Error: {e}")

# Create Tkinter application
app = tk.Tk()
app.title("Retirement Planner")

# Age input
tk.Label(app, text="Enter your age:").pack()
age_entry = tk.Entry(app)
age_entry.pack()

# Gender selection
gender_var = tk.StringVar()
tk.Label(app, text="Select your gender:").pack()
tk.Radiobutton(app, text="Male", variable=gender_var, value="M").pack()
tk.Radiobutton(app, text="Female", variable=gender_var, value="F").pack()

# Submit button
submit_button = tk.Button(app, text="Submit", command=on_submit)
submit_button.pack()

# Run the application
app.mainloop()









