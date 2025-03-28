export class Product {
    code? : number;
    category : string;
    name : string;
    price: number;
    image: string;

    constructor(category: string, name: string, price:number, image:string, code?: number) {
        this.category = category;
        this.name = name;
        this.price = price;
        this.image = image;
    }
    
}