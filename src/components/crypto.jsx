/* eslint-disable react/prop-types */
 // eslint-disable-next-line react/prop-types
 import {Container,TextField,Stack} from "@mui/material";
 import {useState,useEffect} from "react";
import "../App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SearchIcon from '@mui/icons-material/Search';
import CryptoCard from "./cryptolayout";
    // eslint-disable-next-line react/prop-types
        const Crypto=({allcoins})=>{
        const[val,setVal]=useState('');
        console.log(val)
        const[coinslist,setCoinslist]=useState(allcoins);
        const cryptosearch=(e)=>{
const inputValue=e.target.value;
setVal(inputValue);
if(inputValue===""){
  setCoinslist(allcoins)
}
else{
  const searchedVal=inputValue.charAt(0).toUpperCase()+inputValue.slice(1);
  const singlecoin=allcoins.filter((elem)=>elem.name.includes(searchedVal));
  setCoinslist(singlecoin)
}
        }

return(
<Container sx={{marginTop:8,marginBottom:4,padding:4}}>
  <Stack direction="row"justifyContent="center"alignItems="center">
   <TextField
   value={val}
   onChange={cryptosearch}
   label="Search coins"
   variant="outlined"
   />
   </Stack>            
 <div 
style={{
  display:'flex',
  justifyContent:'center',
  alignItems:"center"
  }}>
<div className="cards">

  {coinslist.map((popularcoin,index)=>{

    const{uuid,name,iconUrl,price,change,marketCap}=popularcoin;

    return <CryptoCard 
    key={index}
    index={index}
     uuid={uuid}
     name={name}
     iconUrl={iconUrl}
     price={price}
     change={change}
     marketCap={marketCap}/>
  })}


</div>
</div>
        </Container>
    )
    }
    export default Crypto