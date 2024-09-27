/* eslint-disable react/prop-types */
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from "@mui/material";
import "../App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TimeAgo from "timeago-react";
import * as Colors from "@mui/material/colors";
import "../App.css";
const Feedlayout = ({ date, desc, link, poster }) => {
  return (
    <CardActionArea onClick={() => (window.location.href = link)}>
      <Card>
        <CardMedia component={"img"} src={poster} />
        <CardContent>
          <Box
            component="h6"
            dangerouslySetInnerHTML={{ __html: desc }}
            sx={{
              fontWeight: 400,
              fontFamily: "roboto",
              fontSize: 15,
              color: Colors.grey[800],
              lineHeight: 1.6,
            }}
            id="news-description"
          />
        </CardContent>
        <CardActions>
          <Typography variant="caption">
            <TimeAgo datetime={date} />
          </Typography>
        </CardActions>
      </Card>
    </CardActionArea>
  );
};
export default Feedlayout;
