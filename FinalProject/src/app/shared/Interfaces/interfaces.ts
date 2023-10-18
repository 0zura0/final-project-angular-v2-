export interface IUser{
    Email: string | null | undefined;
    password: string | null | undefined;
    confirmPassword: string | null | undefined;
    nickname: string | null | undefined;
    phone: string | null | undefined;
    website: string | null | undefined;
}

export interface IEmployee{
    id?:number;
    Name: string;
    Salary: number;
    Age: number;
}