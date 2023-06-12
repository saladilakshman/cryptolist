import { useState,useEffect } from 'react'
import './App.css';
import {HashRouter,Route,Routes,Link} from "react-router-dom";
import {Typography,AppBar,useMediaQuery,ListItemIcon,ListItemText,Tabs,Tab,
IconButton,Menu,MenuItem,Toolbar} from "@mui/material";
import { RapidAPIKey } from './APIKey';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from "./components/home";
import Crypto  from './components/crypto';
import Feed from "./components/feed";
import CoinInfo from "./components/coininfo";
import axios from "axios";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FeedIcon from '@mui/icons-material/Feed';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
//import  RoutingNavigation  from './components/navigation';
export default function App(){
  const[tab,setTab]=useState(0);
  const[selectedIndex,setSelectedIndex]=useState(0);
  const[isOpen,setIsOpen]=useState(false);
  const[load,setLoad]=useState(true);
  const[cryptocoinsdata,setCryptocoinsdata]=useState([]);
  const[cryptocoinsnews,setCryptocoinsnews]=useState([]);
  async function getCoinData(){
    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '50',
        offset: '0'
      },
      headers: {
        'X-RapidAPI-Key': RapidAPIKey,
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };
    axios.request(options)
    .then(res=>{
      setCryptocoinsdata(res.data.data.coins)
      setLoad(false)
    })
    .catch(err=>console.log(err.message))
  }
  async function getcryptonewsdata(){
    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: {
        q: 'Cryptocurrency',
        count: '12',
        freshness: 'Day',
        textFormat: 'Raw',
        safeSearch: 'Off'
      },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': 'fa9b2c4aa9msh949ff96d032eea6p1600b2jsn5a3b7c49c42d',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };
    axios.request(options)
    .then(res=>{
        setCryptocoinsnews(res.data.value)
        setLoad(false)
    })
    .catch(err=>console.log(err))
  }
  useEffect(()=>{
   getCoinData()
   getcryptonewsdata()
  },[])
  const handleclose=()=>{
    setIsOpen(false)
  }
  const routeElements=
  [
    {
      icon:<HomeIcon/>,
      name:'Home',
      routepath:'/'
    },
    {
      icon:<CurrencyExchangeIcon/>,
      name:'CryptoCurrencies',
      routepath:'/crypto'
    },
    {
      icon:<FeedIcon/>,
      name:'News',
      routepath:'/feed'
    }
  ]
  const styles={
    icon:{
      backgroundColor:'#169873',
      borderRadius:'50%',
      padding:0.4
    },
    logo:{
      color:'#169873',
      marginLeft:1
    },
box:{
  marginBlockStart:3,
  padding:0.2
}
  }
  const isMobile=useMediaQuery("(max-width:425px)"); 
  return (
    <HashRouter>
    <AppBar position="fixed"sx={{bgcolor:'#F1F2EE'}}>
<Toolbar>
  <CurrencyBitcoinIcon sx={styles.icon}/>
  <Typography variant={isMobile?'h6':'h5'} sx={styles.logo}>Cryptolist</Typography>
{
isMobile?

(<IconButton sx={{marginLeft:'auto'}}color="#1F0812"onClick={()=>setIsOpen(true)}>
  <MenuIcon/>
</IconButton>)
:
(<Tabs value={tab} onChange={(e,Val)=>{
  setTab(Val)
}}textColor="secondary"indicatorColor='secondary'sx={{marginLeft:'auto'}}>
{routeElements.map((routeElement,index)=>{
  return  <Tab key={index}  value={index} label={routeElement.name} component={Link} to={routeElement.routepath}>
  </Tab>
})}
</Tabs>)
}

<Menu open={isOpen}
onClose={handleclose}
transformOrigin={{
  vertical:'top',
  horizontal:'right',
}}
anchorOrigin={{
  vertical:'top',
  horizontal:'right'
}}
sx={{
  top:-82,
  position:'absolute'
}}
>
    {routeElements.map((routeElement,index)=>{
      return <MenuItem key={index} selected={selectedIndex===index} onClick={()=>{
        setIsOpen(prevState=>!prevState);
        setSelectedIndex(index)
      }}
      component={Link}
      to={routeElement.routepath}>
        <ListItemIcon>
          {routeElement.icon}
        </ListItemIcon>
        <ListItemText>
          {routeElement.name}
        </ListItemText>
      </MenuItem>
    })}
</Menu>
</Toolbar>
    </AppBar>
    
    <Routes>
      <Route path="/"element={<Home topcoins={cryptocoinsdata}cryptonews={cryptocoinsnews} load={load}/>}/>
      <Route path="/crypto"element={<Crypto allcoins={cryptocoinsdata}/>}/>
      <Route path="/crypto/:coininfo"element={<CoinInfo/>}/>
      <Route path="/feed"element={<Feed feednews={cryptocoinsnews}/>}/>
    </Routes>
    </HashRouter>
    
  )
}

 