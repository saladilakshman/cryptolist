/* eslint-disable react/prop-types */
 // eslint-disable-next-line react/prop-types
 import {Container,Autocomplete,TextField,CircularProgress} from "@mui/material";
 import {useState,useEffect} from "react";
import "../App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CryptoCard from "./cryptolayout";
    // eslint-disable-next-line react/prop-types
        const Crypto=({allcoins})=>{
        //const isMobile=useMediaQuery("(max-width:425px)")
        const[val,setVal]=useState('');
        const[options,setOptions]=useState([]);
        //const[showspin,setShowSpin]=useState(false);
        const[coinslist,setCoinslist]=useState(allcoins);
        const valuechange=(event,newVal)=>{
            const searchedval=newVal.split('');
            searchedval[0]=searchedval[0].toUpperCase();
            const modifiedtext=searchedval.join("");
            const cryptonames=allcoins.filter((elem)=>elem.name.includes(modifiedtext));
          const listofcryptonames=cryptonames.map((el)=>el.name);
          setOptions(listofcryptonames)
         setVal(modifiedtext)
         const singlecoin=allcoins.filter((item)=>item.name===modifiedtext);
         setCoinslist(singlecoin)
          
        }
       
return(
<Container sx={{marginTop:8,marginBottom:4,padding:4}}>
<Autocomplete className="autocomplete"
inputValue={val}
onInputChange={valuechange}
renderInput={(params)=><TextField label="search coin"{...params}
sx={{
  width:250,
  display:'block',
  margin:'auto',
}}/>}
options={options}
/>
            
            
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