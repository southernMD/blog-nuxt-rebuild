export const useBoolean = (i:string | boolean):boolean=>{
    if(i == 'false' || i == false)return false
    else if(i == 'true' || i == true) return true
    else return true
}