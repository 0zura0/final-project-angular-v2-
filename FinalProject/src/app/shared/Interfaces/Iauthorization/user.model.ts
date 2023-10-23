//ეს რასაც დააბრუნებს იმაში იქნება ობიექტი ამ ტიპის

export type Role = "user"     
export interface IUser{
    id:string,
    firstname:string,
    lastname: string,
    nickname: string,
    email: string,
    phone: string,
    role: Role 
    imagePath?:string
}