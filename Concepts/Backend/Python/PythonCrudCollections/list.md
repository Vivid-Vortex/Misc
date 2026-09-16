### You can run this in any compiler or online compiler like [onlinegdb](https://www.onlinegdb.com/)

Python list is having append(element_name)/insert(position, element_name) and list remove is same as java list remove. In short to memorize add and remove method of set, you can compare add and remove method of List in java, it is same. So only think Java List add and remove methods when remebering Python set add and remove emthods. 

```
items = []

# Create:
items.append(1)
items.append('A')
items.append('Ball')
items.insert(2, 'Apple')
print(items)

# Read:
print(items[0])
print(items[1])
print(items[2])
print(items[3])
print(items[:])
print(items[1:3])
print(items[:3])
print(items[1:])
print(f'Full list: {items}')

# Update:
print("Updating list:")
items[1] = 'B'
print(items[1])

# Delete:
print('Deleting/Removing list elements:')
print(items)
items.remove('B')
print(items)
```
