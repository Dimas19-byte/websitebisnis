
fruits = ["Apel", "Banana", "Ceri", "Durian", "Elderberry"]
numbers = [1, 2, 3, 4, 5]

for index, (number, fruit) in enumerate(zip(numbers, fruits)):
  print(f"Index {index}: {number} - {fruit}")