
export  interface IFromInput{
    email : string;
    name : string;
    password : string;
  }

export interface ISignIn{
    email : string;
    password : string | number;
}  

export interface IUserDetails{
  isError : boolean; 
  isLoading : boolean;
  data? : IToken;
  isSuccess : boolean;
  isUninitialized : boolean;
  requestId : string;
  status : string;
}

export interface IToken{
    token : string;
}

export interface IUserData{
    name: string;
    age: number;
    city: string;
    _id?: string | number ;
    __v?: string;
}
 
export type PostUserResponse = IUserData[];

export interface IAddUser{
  name : string;
  age  : number;
  city : string;
  _id? : string | number;
  __v? : string;
}