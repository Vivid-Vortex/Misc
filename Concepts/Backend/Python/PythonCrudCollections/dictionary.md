```
thisdict = {}

#Create/Add
print("Adding elements to dictionary")
thisdict["color"]="white"
#But a better way is below update method. Update will replace the existing key. Key is unexisting then it will add that key.
thisdict.update({"brand": "Ford"})
thisdict.update({"model": "Mustang"})
thisdict.update({"year": "1964"})
print("\n")

#Read
print("Reading elements from dictionary")
print(thisdict["brand"])
#But a better approach is below get method
print(thisdict.get("model"))
#Get all the keys
print(thisdict.keys())
#Get all the values
print(thisdict.values())
print("\n\n")

#update
print("Updating elements of dictionary")
thisdict["year"]=1975
print(thisdict)
#But a better approach is to use update
print(thisdict.update({"year": 2020}))
print(thisdict)
print("\n\n")

#Delete
print("Deleting elements of dictionary")
print(thisdict.pop("brand")) #It's also return the poped elemetns that is Ford
print(thisdict)
#Pop out last element like a stack
print(thisdict.popitem()) #It also returns the last popped item so it will be ('year', 2020)
#Clear all the elements of dictionary
#Delete dictionary completly
print(thisdict)
del thisdict["model"]
print(thisdict)
print(thisdict.clear())
del thisdict
print(thisdict) #NameError: name 'thisdict' is not defined
```
