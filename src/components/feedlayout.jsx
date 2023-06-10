/* eslint-disable react/prop-types */
import {Typography,Stack,Avatar,Paper,useMediaQuery } from "@mui/material";
import "../App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import moment from 'moment'
const Feedlayout=({key,date,desc,name,link,poster,logo,channelname})=>{
    const isMobile=useMediaQuery("(max-width:425px)");
    return(
<>
<Paper key={key} sx={{
    display:'grid',
    gridTemplateColumns:'1fr',
    gridTemplateRows:isMobile?'repeat(3,auto)':'repeat(3,7.5rem)',
    padding:0.2
}} onClick={()=>window.location.href=link}>
    <Stack direction="row"justifyContent="center"alignItems="center"p={1}>
    <Typography variant="body1"sx={{color:'black',fontWeight:500,textWrap:'balance'}}>{name}</Typography> 
      <img src={poster}alt=""style={{width:100,flex:1}}/>
    </Stack>
    <Stack>
    <Typography variant="body1"sx={{paddingTop:2,textWrap:'balance',p:1}}>{desc}</Typography>   
    </Stack>
    <Stack direction="row"justifyContent="space-between"alignItems="flex-end"p={1}>
        <Stack direction="row"justifyContent="center"gap={0.1}alignItems="end">
   <Avatar alt=""src={logo} sx={{width:25}}/>
   <Typography variant="caption">{channelname}</Typography>
        </Stack>
        <Typography variant="caption">{moment(date).startOf().fromNow()}</Typography>
        </Stack>
</Paper>
</>
    )
}
export default Feedlayout