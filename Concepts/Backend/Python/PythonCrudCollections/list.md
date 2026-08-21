### You can run this in any compiler or online compiler like [onlinegdb](https://www.onlinegdb.com/)

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
