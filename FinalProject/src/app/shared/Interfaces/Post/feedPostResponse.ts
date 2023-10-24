export type Role = "user" 

export interface FeedPostResponse{
        body: string,
        author: {
            id: number,
            firstname: string,
            lastname: string,
            nickname: string,
            email: string,
            phone: string,
            role: Role,
            imagePath:string
        },
        id: number,
        created_at: Date
}