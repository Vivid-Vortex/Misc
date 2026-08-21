### You can run this in any compiler or online compiler like [onlinegdb](https://www.onlinegdb.com/)

- ***In Python, tuples are immutable, meaning you cannot directly add, append, or modify elements once they are created. However, you can achieve this by concatenating two tuples or converting the tuple to a list and back.*** So <mark>Create, Update, Delete operation directly not possible on tuple</mark>.

```
thistuple = ("apple", "banana", "cherry")

#Create/Add
#In Python, tuples are immutable, meaning you cannot directly add, append, or modify elements once they are created. However, you can achieve this by concatenating two tuples or converting the tuple to a list and back.
y = list(thistuple)
y.append("orange")
thistuple = tuple(y)
#Add tuple to a tuple.
thistuple = ("apple", "banana", "cherry")
y = ("orange",)
thistuple += y
print(thistuple)

#Read
thistuple = ("apple", "banana", "cherry")
print(thistuple[1])
print(thistuple[-1])
print(thistuple[2:5])
print(thistuple[:4])
print(thistuple[2:])

#Update
#In Python, tuples are immutable, meaning you cannot directly add, append, or modify elements once they are created. However, you can achieve this by concatenating two tuples or converting the tuple to a list and back.
list = list(thistuple)
list[1]="Kiwi"
new_tuple=tuple(list)
print(new_tuple)

#Delete
#In Python, tuples are immutable, meaning you cannot directly add, append, or modify elements once they are created. However, you can achieve this by concatenating two tuples or converting the tuple to a list and back.

#-----------------
#Join tuple
tuple1 = ("a", "b" , "c")
tuple2 = (1, 2, 3)

tuple3 = tuple1 + tuple2
print(tuple3)

#Multiply tuple
fruits = ("apple", "banana", "cherry")
mytuple = fruits * 2

print(mytuple)

#Loop tuple
thistuple = ("apple", "banana", "cherry")
for x in thistuple:
  print(x)

#Loop Through the Index Numbers
thistuple = ("apple", "banana", "cherry")
for i in range(len(thistuple)): #range(len(3))
  print(thistuple[i])

#Unpacking a Tuple
fruits = ("apple", "banana", "cherry")
(green, yellow, red) = fruits
print(green)
print(yellow)
print(red)
```


