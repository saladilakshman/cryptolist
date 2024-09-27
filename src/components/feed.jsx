/* eslint-disable react/prop-types */
import { Container } from "@mui/material";
import Feedlayout from "./feedlayout";
const Feed = ({ feednews }) => {
  return (
    <Container sx={{ marginTop: 8, marginBottom: 5 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="cards">
          {Array.from(feednews, (feed, index) => {
            const { createdAt, description, url, thumbnail } = feed;
            return (
              <Feedlayout
                key={index}
                date={createdAt}
                desc={description}
                link={url}
                poster={thumbnail}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};
export default Feed;
