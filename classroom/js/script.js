// for(let i = 1; i <= 10; i++){
//     for(let j = 1; j  <= 10; j++){
//         console.log(i + " x " + j + " = " + (i * j));

//     }
//     console.log("-----------")

// }

// let a = 16
// if(a % 2 === 0){
//     console.log("zuyg")

// }
// else{
//     console.log("kent")
// }

// let delay = 0;

// for (let i = 1; i < 10; i++) {
//     for (let k = 1; k < 10; k++) {
//         delay += 1000;
//         setTimeout(() => {
//             console.log(`${i} * ${k} = ${i * k}`);
//         }, delay);
//     }
// }

// let nerka = new Date().getFullYear;

// function getAge(tvakan) {
//     return `Du ${nerka - tvakan} tarekan es`;
// }

// console.log(getAge(1963));

// function cube(num){
//     return num ** 3

// }

// console.log(cube(5));

// function upperCase(str){

//       return str[0].toUpperCase() + str.slice(1);

// }

// console.log(upperCase("albert"))

// const el = document.createElement("div")
// con
// document.body.appendChild(el)
// document.body.prepend(el)

// const board = document.getElementById("board")
// const status = document.getElementById("status")

// const cells = document.querySelectorAll(".cell")

// let player = true
// let game = true

// const state = new Array(9).fill(null)

// const wins = [
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,4,8],
//     [2,4,6],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
// ]

// cells.forEach((cell, i) => {
//     cell.addEventListener("click" , () =>{
//         if(!game){
//             return

//         }

//         if(cell.innerHTML){
//             return

//         }
//         const p = document.createElement("div")
//         p.className = player ? "x" : "o"
//         cell.appendChild(p)
//         if(checkWin(player)){
//             status.textContent = `${player ? "X" :"o"} haxtecin `

//         }
//         player = !player

//     } )
// })

// function checkWin(turn){
//     return wins.some(pattern => {
//         return pattern.every(pat => state[pat] === turn )
//     })

// }

// class Dzuk{
//     constructor(tesak, gin,qash){
//         this.tesak = tesak
//         this.gin = gin
//         this.qash = qash

//     }
// }

// const ishxan = new Dzuk("ishxan", 2000, "2kg" )

// console.log(ishxan)

// class Transport {
//   constructor(model, taretiv) {
//     this.model = model;
//     this.taretiv = taretiv;
//   }
// }

// class Avto extends Transport {
//   constructor(model, taretiv, dzi, mator) {
//     super(model, taretiv);
//     this.dzi = dzi;
//     this.mator = mator;
//   }

//   car() {
//     console.log(
//       `es unem ${this.model} maknishi avto ${this.taretiv} tiv ${this.dzi} dzi ${this.mator} mator`,
//     );
//   }
// }

// const avto = new Avto("Mercedes", 1997, 194, `2.8`);

// avto.car();







