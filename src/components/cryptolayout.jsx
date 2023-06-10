/* eslint-disable react/prop-types */
import {Typography,Stack,useTheme,Divider,Card,CardContent,} from "@mui/material";
import "../App.css";
import {Link,useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { numberformatting } from "./intlnumber";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
const CryptoCard=({key,index,uuid,name,iconUrl,price,change,marketCap})=>{
    const theme=useTheme();
    const navigate=useNavigate();
    useEffect(()=>{
      const allcards=document.querySelectorAll(".crypto-card");
      const observers=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
    entry.target.classList.add("styles");
      }
      else{
    entry.target.classList.remove("styles");
      }
    })
      },{threshold:0.5})
      allcards.forEach((card)=>{
        observers.observe(card)
      })
    },[])
    return( 
      <Link  className="Link"
      onClick={()=>{
        document.startViewTransition(()=>navigate(`/crypto/${uuid}`))
      }}>    
<Card key={key} sx={{
    minWidth:300,
    "&:hover":{boxShadow:8},
    }} className="crypto-card">

<CardContent 
sx={{
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
  }}>
<Typography 
variant="body1"
sx={{
  flex:0.1}}
  >{index+1}.
  </Typography>
<Typography 
variant="body1"
sx={{
  flex:1
  }}>{name}
  </Typography>
  <img src={iconUrl}alt=""style={{width:25}}/>
</CardContent>

<Divider/>

<Stack 
direction="column"
gap={1}
sx={{p:1.5,marginInlineStart:1}}
justifyContent="flex-start"
alignItems="baseline">
<Typography variant="body2">
 Price: {numberformatting(Number(price))}
</Typography>
<Typography variant='body2'color={()=>{
  if(Number(change)<0){
    return theme.palette.warning.dark
  }
  else{
    return theme.palette.primary.dark
  }
}}>
<span>MarketChange:</span> {Number(change)}
</Typography>
 <Typography variant="body2">
 MarketCap: {numberformatting(Number(marketCap))}
  </Typography>
       </Stack>

    </Card>
    </Link>
    )
}
export default CryptoCard