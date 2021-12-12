import React from "react";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { ListSubheader, Toolbar, Typography } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SubMenu from "./SubMenu";

const SlideBar = () => {
    // danh sách router
    const menuItems = [
        {
            text: 'Trang chủ',
            icon: <CardMembershipIcon />,
            path: "/",
        },
        {
            text: 'Thống kê',
            icon: <BarChartIcon />,
            iconOpen: <ExpandLess />,
            iconClose: <ExpandMore />,
            chiren: [
                {
                    text: 'Doanh thu',
                    path: "/admin/chart/all",
                },
                {
                    text: 'Mã giảm giá',
                    path: "/admin/chart/discount",
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
            text: 'Giảm giá',
            icon: <CategoryIcon />,
            path: "/admin/giam-gia",
        },
        {
            text: 'Hóa đơn',
            icon: <CardMembershipIcon />,
            iconOpen: <ExpandLess />,
            iconClose: <ExpandMore />,
            chiren: [
                {
                    text: 'Quản lý hóa đơn',
                    path: "/admin/bill/managerbill",
                },
                {
                    text: 'Hoàn trả(Chưa xong)',
                },
            ]
        },
        {
            text: 'Phiếu nhập kho',
            icon: <ReceiptIcon />,
            path: "/admin/receipt",
        },
        {
            text: 'Phiếu xuất kho',
            icon: <ReceiptLongIcon />,
            path: "/admin/nk",
        },
        {
            text: 'Nhân viên',
            icon: <PermIdentityIcon />,
            path: "/admin/staff",
        },
    ];

    return (
        <div>
            {/* logo */}
            <Toolbar>
                <img src="../../public/logo192.png" alt="logo"></img>
                <Typography>Gumdam</Typography>
            </Toolbar>
            <Divider />
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