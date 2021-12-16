import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RePassword from './RePassword';
import Address from '../Adress/Adress';
import BillCustomer from './BillCustomer';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{width: "100%"}}
        >
            {value === index && (
                <Box >
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', marginTop: 3 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
            >
                <Tab sx={{ alignItems: 'flex-start', marginTop: 3, width: "300px" }} label="Thông tin của bạn" {...a11yProps(0)} />
                <Tab sx={{ alignItems: 'flex-start', marginTop: 3, width: "300px" }} label="Địa chỉ" {...a11yProps(1)} />
                <Tab sx={{ alignItems: 'flex-start', marginTop: 3, width: "300px" }} label="Lịch sử mua hàng" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}  >
                <RePassword />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Address/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <BillCustomer/>
            </TabPanel>
        </Box>
    );
}