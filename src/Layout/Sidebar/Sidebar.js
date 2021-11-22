import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
function Sidebar(){
    return(
        <div>
            <ProSidebar>
                <SidebarHeader>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape = "square" >
                        < SubMenu  title = "Sản phẩm">
                            <MenuItem>Sản phẩm</MenuItem>
                            <MenuItem>Danh mục</MenuItem> 
                        </SubMenu>
                        < SubMenu  title = "Hóa đơn">
                            <MenuItem>Hóa đơn</MenuItem>
                            <MenuItem>Phiếu nhập</MenuItem> 
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                </SidebarFooter>
            </ProSidebar>;
        </div>
    );
}
export default Sidebar;