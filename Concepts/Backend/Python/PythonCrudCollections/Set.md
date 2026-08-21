
```
thisset = set()

#########Add items to set
thisset.add("apple")
thisset.add("banana")
thisset.add("cherry")
print(thisset)

#To add items from another set into the current set, use the update() method.
thisset = {"apple", "banana", "cherry"}
tropical = {"pineapple", "mango", "papaya"}
thisset.update(tropical)
print(thisset)

#The object in the update() method does not have to be a set, it can be any iterable object (tuples, lists, dictionaries etc.).
mylist = ["kiwi", "orange"]
thisset.update(mylist)
print(thisset)

#########Read items to set
#Loop through the set, and print the values:
for x in thisset:
  print(x)

#Check if "banana" is present in the set:
print("banana" in thisset)

#Check if "banana" is NOT present in the set:
print("banana" not in thisset)

#########Update items of set
#Once a set is created, you cannot change its items, but you can add new items.
thisset.remove("banana") #If the item to remove does not exist, remove() will raise an error.
print(thisset)

thisset.discard("banana") #If the item to remove does not exist, discard() will NOT raise an error.

#You can also use the pop() method to remove an item, but this method will remove a random item, so you cannot be sure what item that gets removed.
# Sets are unordered, so when using the pop() method, you do not know which item that gets removed.
#The return value of the pop() method is the removed item.
x = thisset.pop()
print(x)
print(thisset)

#The clear() method empties the set:
thisset.clear()
print(thisset)

#The del keyword will delete the set completely:
del thisset
print("Deleting set...")
print(thisset) #NameError: name 'thisset' is not defined

#--------------------
#frozenset is an immutable version of a set.
x = frozenset({"apple", "banana", "cherry"})
print(x)
print(type(x))
```








