/* eslint-disable react/prop-types */
import {Container} from "@mui/material";
import Feedlayout from "./feedlayout";
  const Feed=({feednews})=>{
    return(
        <Container sx={{marginTop:8,marginBottom:5}}>
<div style={{
  display:'flex',
  justifyContent:'center',
  alignItems:"center"
  }}>
<div className="cards">
{Array.from(feednews,(feed,index)=>{
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
</div>
        </Container>
    )
    }
    export default Feed