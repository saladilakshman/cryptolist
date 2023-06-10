 import {Container,Typography,Stack,
  useMediaQuery,useTheme,CircularProgress} from "@mui/material";
 import {useEffect,useState} from "react";
 import axios from "axios";
 import { useNavigate } from "react-router-dom";
 import "../App.css";
 import { numberformatting } from "./intlnumber";
 import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CryptoCard from "./cryptolayout";
import Feedlayout from "./feedlayout";
import { RapidAPIKey } from "../APIKey";
 // eslint-disable-next-line react/prop-types
 const Home=({topcoins,cryptonews,load})=>{
    const[stats,setStats]=useState([]);
    const isMobile=useMediaQuery("(max-width:425px)")
    const theme=useTheme();
    // eslint-disable-next-line react/prop-types
    let toppopularcoins=topcoins.slice(0,10);
    const navigate=useNavigate();
    useEffect(()=>{
        const options = {
            method: 'GET',
            url: 'https://coinranking1.p.rapidapi.com/stats',
            params: {
              referenceCurrencyUuid: 'yhjMzLPhuIDl'
            },
            headers: {
              'X-RapidAPI-Key': RapidAPIKey,
              'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
          };
axios.request(options).then(res=>setStats(res.data)).catch(err=>console.log(err.message))
    },[])
const statistics=[
  {type:'CryptoCurrencies',value:stats?.data?.totalCoins},
  {type:'MarketCap',value:stats?.data?.totalMarketCap},
  {type:'Market',value:stats?.data?.totalMarkets},
  {type:'Exchanges',value:stats?.data?.totalExchanges},
  {type:'24h volume',value:stats?.data?.total24hVolume}
]
const RouteNavigation=(component)=>{
  document.startViewTransition(()=>{
    navigate(component)
  })
}
return(
  
   <Container sx={{marginTop:12,marginBottom:8}}>
    {load?<div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginBlockStart:'15rem'
    }}><CircularProgress/></div>:<>
    <Typography variant={isMobile?'h6':'h4'}sx={{marginBlockEnd:1.5}}>Global Crypto Stats</Typography>
<div style={{
  display:'grid',
  gridTemplateColumns:'repeat(2,1fr)',
  placeItems:'baseline',
  gap:15
}}>
  {statistics.map((statistic,index)=>{
return <Stack direction="column"key={index}>
  <Typography variant="body2"color={theme.palette.grey[800]}>{`Total ${statistic.type}`}</Typography>
  <Typography variant="h6">{numberformatting(Number(statistic.value))}</Typography>
</Stack>
  })}
</div>
<Stack direction="row"justifyContent="space-between"alignItems="center"marginBlockStart={6}>
  <Typography variant={isMobile?'h6':'h4'}>
    Top 10 CryptoCurrencies
  </Typography>

  <Typography 
  variant={isMobile?"body2":'h6'}
   color={theme.palette.primary.main} 
   sx={{
    '&:hover':{color:theme.palette.primary.light},cursor:'pointer'
    }}
    onClick={()=>RouteNavigation('/crypto')}>
    Show more
  </Typography>
</Stack>
<div 
style={{
  display:'flex',
  justifyContent:'center',
  alignItems:"center"
  }}>
<div className="cards">

  {toppopularcoins.map((popularcoin,index)=>{

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
<Stack direction="row"justifyContent="space-between"alignItems="center"marginBlockStart={6}>
  <Typography variant={isMobile?'h6':'h4'}>
    Top CryptoNews
  </Typography>

  <Typography 
  variant={isMobile?"body2":'h6'}
   color={theme.palette.primary.main} 
   sx={{
    '&:hover':{color:theme.palette.primary.light},cursor:'pointer'
    }}
    onClick={()=>RouteNavigation("/feed")}>
    Show more
  </Typography>
</Stack>
<div 
style={{
  display:'flex',
  justifyContent:'center',
  alignItems:"center"
  }}>
<div className="cards">
{Array.from(cryptonews,(feed,index)=>{
  const{dataPublished,description,name,url,provider,image}=feed;
return <Feedlayout 
       key={index} 
       date={dataPublished}
       desc={description}
       name={name}
       link={url}
       channelname={provider[0]?.name}
      poster={image?.thumbnail?.contentUrl}
      logo={provider[0].image?.thumbnail?.contentUrl}
       />
})}
</div>
</div></>}
   </Container>
   
)
}
export default Home