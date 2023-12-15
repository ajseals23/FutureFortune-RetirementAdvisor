import pandas as pd
import openpyxl

retirement_age = 63
age = int(input("How old are you?: "))
Gender = input("Enter your sex (M/F): ")
years_to_retirement = int(retirement_age - age)

life_expectancy = pd.read_excel("Life Expectancy Excel.xlsx")
asset_allocation = pd.read_excel("Asset Allocation Excel.xlsx")
life_expectancy = pd.DataFrame(life_expectancy)
asset_allocation = pd.DataFrame(asset_allocation)

# function to retrieve info on life expectancy data table from SSA
def retrieve_life_expectancy(age, gender, table):
    if gender == "M" or gender == "m":
        num = table["Life Expectancy"].iloc[age]
        return num
    elif gender == "F" or gender == "f":
        num = table["Life Expectancy2"].iloc[age]
        return num
    else:
        raise Exception("Please enter M or F for gender")

# function to retrieve info on the asset allocation mix data table
def get_asset_allocation(age, table):
    x = 0
    while x < len(table):
        if years_to_retirement >= 40:
           print(table.iloc[x])
           break
        if years_to_retirement == table["Years to Retirement"].iloc[x]:
            print(table.iloc[x])
            break
        x += 1


print("Life Expectancy:", retrieve_life_expectancy(age, Gender, life_expectancy), "Years")
print("Years Until Retirement:", years_to_retirement)
print("\nAsset Allocation:\n")
get_asset_allocation(years_to_retirement, asset_allocation)









