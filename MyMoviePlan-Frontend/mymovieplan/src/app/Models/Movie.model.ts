export interface Movies{
     
    movieid?:number;
    movieName:string;
    language:string;
    imageurl?:string;
    summary:string;
    release:Date;
    active:boolean
    genres:{
        gid:number
    }
    
}