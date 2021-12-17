import React from "react";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { ListSubheader, Toolbar, Typography } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import CategoryIcon from '@mui/icons-material/Category';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SubMenu from "./SubMenu";
import './headadmin.css';
import logo from './Logo.png';
import MailIcon from '@mui/icons-material/Mail';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const SlideBar = () => {
    // const logout = () => {
    //     if(CookieService.getCookie('accessToken')){
    //       GoogleApi.logout(CookieService.getCookie("accessToken"))
    //     }
    //     CookieService.removeCookie();
    //     alert('Logout !')
    //     window.location.replace('/home')
    //   }
    // danh sách router
    const menuItems = [
        {
            text: 'Trang chủ',
            icon: <CardMembershipIcon />,
            path: "/admin",
        },
        {
            text: 'Thống kê',
            icon: <BarChartIcon />,
            path: "/admin/thk",
        },

        {
            text: 'Giảm giá',
            icon: <ReceiptIcon />,
            iconOpen: <ExpandLess />,
            iconClose: <ExpandMore />,
            chiren: [
                {
                    text: 'Mã giảm giá',
                    path: "/admin/discount",
                },
                {
                    text: 'Giảm giá sản phẩm',
                    path: "/admin/giam-gia",
                },
            ]
        },

        {
            text: 'Sản phẩm',
            icon: <ProductionQuantityLimitsIcon />,
            path: "/admin/product",
        },
        {
            text: 'Danh mục',
            icon: <CategoryIcon />,
            path: "/admin/category",
        },

        {
            text: 'Khách hàng',
            icon: <SupportAgentIcon />,
            path: "/admin/khach-hang",
        },

        {
            text: 'Hóa đơn',
            icon: <ReceiptLongIcon />,
            path: "/admin/bill/managerbill",
        },
        {
            text: 'Gửi Mail',
            icon: <MailIcon />,
            path: "/admin/sendmail",
        },
    ];

    return (
        <div>
            {/* logo */}
            <Toolbar>
                <img src={logo} alt="logo" style={{width: "100px", height: "100px"}} ></img>
            </Toolbar>
            {/* list */}
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">

                    </ListSubheader>
                }
            >
                {menuItems.map((item,index) => (
                    <SubMenu item={item} key={index}/>
                ))}
            </List>
        </div>
    );
}
export default SlideBar;