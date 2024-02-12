import * as React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router";

import "./index.css";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PriceCards from "./price-csrds";
import { Empty } from "antd";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function BasicTabs({ img }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={<span style={{ color: "white" }}>Chipta narxlari</span>}
            {...a11yProps(0)}
          />{" "}
          <Tab
            label={<span style={{ color: "white" }}>Joy haqida</span>}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="text-white">
          <PriceCards img={img} />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="text-white">
          <Empty   description={false} />
        </div>
      </CustomTabPanel>
    </Box>
  );
}

const TicketPage = () => {
  const { type, id } = useParams();

  const { data: ticketData, isLoading: ticketIsLoding } = useQuery(
    "ticket-data",
    () => {
      return axios.get(`http://localhost:3001/tickets/${id}`);
    }
  );

  return (
    <>
      <div className="w-[100%] h-[400px] relative">
        <img src={ticketData?.data?.img} alt="" className="w-[100%] h-[100%]" />

        <Typography className="flex items-center justify-center rounded-full price">
          {ticketData?.data?.price} UZS
        </Typography>
      </div>

      <BasicTabs img={ticketData?.data?.img} />
    </>
  );
};

export default TicketPage;
