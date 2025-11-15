/*
    Множення чисел на 2:
    Дано масив чисел [1, 2, 3, 4, 5]. 
    Помножити всі елементи на 2.
    Приклад [1, 2, 3, 4, 5] → [2, 4, 6, 8, 10].
*/

const numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i]
    numbers[i] = number * 2;
}
