let numbers = [12, 5, 8, 21, 3, 17, 9, 30, 2, 14];

//console.log(numbers)


// for(let i = 0; i < 10; i++){
//    if(numbers[i] > 10){
//     console.log(numbers[i])
//    }    
// }


// let sum = 0
// for (let i = 0;i < numbers.length;i++){
//     sum += numbers[i]
// }
// console.log(sum)


// let min = numbers[0]
// for(let i = 1; i < numbers.length;i++){
//     if(numbers[i] < min){
//         min = numbers[i]
//     }

// }

// console.log(min)


let count = 0
for(let i = 0; i < numbers.length; i++){
    if(numbers[i] % 2 === 0){
        count ++
    }
}
console.log(count)