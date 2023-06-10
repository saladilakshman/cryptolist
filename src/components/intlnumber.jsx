export const numberformatting=(param)=>{
return new Intl.NumberFormat("en-US",{notation:'compact'}).format(param)
}