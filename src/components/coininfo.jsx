import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { RapidAPIKey } from "../APIKey";
import { numberformatting } from "./intlnumber";
import {
  CircularProgress,
  Container,
  useTheme,
  useMediaQuery,
  Link,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  ExclamationCircleOutlined,
  AccountBookOutlined,
  FundOutlined,
  DollarOutlined,
  BorderlessTableOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
const CoinInfo = () => {
  const { coininfo } = useParams();
  const [load, setLoad] = useState(true);
  const isMobile = useMediaQuery("(max-width:425px)");
  const theme = useTheme();
  const [coindetails, setCoindetails] = useState({});
  const coinStyles = {
    coinNameColor: theme.palette.primary.main,
    coinTextColor: theme.palette.grey[800],
    coinName: coindetails?.name,
  };
  const { coinNameColor, coinTextColor, coinName } = coinStyles;
  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://coinranking1.p.rapidapi.com/coin/${coininfo}`,
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
      },
      headers: {
        "X-RapidAPI-Key": RapidAPIKey,
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((res) => {
        setCoindetails(res.data.data.coin);
        setLoad(false);
      })
      .catch((err) => console.log(err.message));
  }, [coininfo]);
  const coinStatistics = [
    {
      symbol: <DollarOutlined />,
      text: "Price to INR",
      value: coindetails?.priceAt,
    },
    {
      symbol: <BorderlessTableOutlined />,
      text: "Rank",
      value: coindetails?.rank,
    },
    {
      symbol: <ThunderboltOutlined />,
      text: "24h Volume",
      value: coindetails["24hVolume"],
    },
    {
      symbol: <DollarOutlined />,
      text: "Marketcap",
      value: coindetails?.marketCap,
    },
    {
      symbol: <TrophyOutlined />,
      text: "All-time-high(daily avg.)",
      value: coindetails?.allTimeHigh?.price,
    },
    {
      symbol: <FundOutlined />,
      text: "Number Of Markets",
      value: coindetails?.numberOfMarkets,
    },
    {
      symbol: <AccountBookOutlined />,
      text: "Number Of Exchanges",
      value: coindetails?.numberOfExchanges,
    },
    {
      symbol: <ExclamationCircleOutlined />,
      text: "Approved supply",
      value: coindetails?.supply?.confirmed,
    },
    {
      symbol: <ExclamationCircleOutlined />,
      text: "Total Supply ",
      value: coindetails?.supply?.supplyAt,
    },
    {
      symbol: <ExclamationCircleOutlined />,
      text: "Circulating Supply ",
      value: coindetails?.supply?.circulating,
    },
  ];
  return (
    <>
      {load ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBlockStart: "15rem",
          }}
        >
          <CircularProgress color="primary" />
        </div>
      ) : (
        <Container sx={{ marginTop: 12 }}>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h6" color={coinNameColor}>
              {coinName}Price
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color={coinTextColor}
            >
              {coinName} live price in IN Rupees. View Value statistics, market
              cap and supply.
            </Typography>
          </Stack>
          <div className="coin-details">
            <Stack
              justifyContent="space-between"
              gap={1}
              alignItems={isMobile ? "center" : ""}
            >
              <Typography variant="h6" color={coinNameColor}>
                {coinName} Value Statistics
              </Typography>
              <Typography variant="body1" color={coinTextColor}>
                An overview showing the stats of {coinName}
              </Typography>
              <List>
                <Paper>
                  {coinStatistics.slice(0, 5).map((coinstatistic, index) => {
                    const { text, symbol, value } = coinstatistic;
                    return (
                      <>
                        <ListItem key={index}>
                          <ListItemIcon>{symbol}</ListItemIcon>
                          <ListItemText sx={{ flex: 1, paddingRight: 2 }}>
                            <Typography variant="body1">{text}</Typography>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <Typography variant="body2">
                              {numberformatting(Number(value))}
                            </Typography>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider sx={{ m: 0.3 }} />
                      </>
                    );
                  })}
                </Paper>
              </List>
            </Stack>

            <Stack
              justifyContent="center"
              gap={1}
              alignItems={isMobile ? "center" : ""}
            >
              <Typography variant="h6" color={coinNameColor}>
                {coinName} Other Statistics
              </Typography>
              <Typography
                variant="body1"
                color={coinTextColor}
                textAlign={isMobile ? "center" : ""}
              >
                An overview showing the genericStats of all Crypto Currencies
              </Typography>
              <List>
                <Paper>
                  {coinStatistics.slice(5, 10).map((coinstatistic, index) => {
                    const { text, symbol, value } = coinstatistic;
                    return (
                      <>
                        <ListItem key={index}>
                          <ListItemIcon>{symbol}</ListItemIcon>
                          <ListItemText sx={{ flex: 1, paddingRight: 2 }}>
                            <Typography variant="body1">{text}</Typography>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <Typography variant="body2">
                              {numberformatting(Number(value))}
                            </Typography>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider sx={{ m: 0.3 }} />
                      </>
                    );
                  })}
                </Paper>
              </List>
            </Stack>
            <Typography
              variant={isMobile ? "body1" : "h5"}
              textAlign={isMobile ? "center" : "start"}
              color={coinNameColor}
            >
              {coindetails?.description}
            </Typography>
            <Stack justifyContent="space-between" gap={1}>
              <List>
                <Paper>
                  {coindetails?.links?.map((link, index) => {
                    const { type, url, name } = link;
                    return (
                      <>
                        <ListItem
                          key={index}
                          sx={{ width: isMobile ? 320 : 445 }}
                        >
                          <ListItemText>
                            <Typography variant="body1">{type}</Typography>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <Link href={url} underline="none">
                              <Typography
                                variant="caption"
                                color={theme.palette.primary.dark}
                              >
                                {name}
                              </Typography>
                            </Link>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider sx={{ m: 0.3 }} />
                      </>
                    );
                  })}
                </Paper>
              </List>
            </Stack>
          </div>
        </Container>
      )}
    </>
  );
};
export default CoinInfo;
