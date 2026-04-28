class Car{
    constructor(brand,model,year,color){
        this.brand = brand
        this.model = model
        this.year = year
        this.color = color

        
    }
    getInfo(){
        return `Սա ${this.brand} ${this.model} է, ${this.color} գույնի, արտադրված ${this.year} թվականին`
    }

    getAge(){
        return new Date().getFullYear() - this.year
    }

}


const Merc = new Car("Mercedes", `E63`, 2020, "black")
const BMW = new Car("BMW", `E60`, 2021, "white")




const cars = [Merc,BMW]
cars.forEach(car => {
    console.log(car.getInfo())
})