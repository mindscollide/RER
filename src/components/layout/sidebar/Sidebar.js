// Import necessary components from Ant Design
import { Layout, Menu } from "antd";
import "./Sidebar.css";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width={250} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{
          height: "100%",
          borderTopRightRadius: "10px",
        }}
      >
        <Menu.SubMenu
          key="sub1"
          icon={<i className="icon-settings"></i>}
          title="Setups"
          className="menu-item"
        >
          <Menu.Item key="2" className="menu-item-sub">
            Services
          </Menu.Item>
          <Menu.Item key="3" className="menu-item-sub">
            Country
          </Menu.Item>
          <Menu.Item key="4" className="menu-item-sub">
            City
          </Menu.Item>
          <Menu.Item key="5" className="menu-item-sub">
            Branch
          </Menu.Item>
          <Menu.Item key="6" className="menu-item-sub">
            Employee
          </Menu.Item>
          <Menu.Item key="7" className="menu-item-sub">
            Shifts
          </Menu.Item>
          <Menu.Item key="8" className="menu-item-sub">
            Counters
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="sub2"
          icon={<i className="icon-report"></i>}
          title="Reports"
          className="menu-item-two"
        >
          <Menu.Item key="9" className="menu-item-sub">
            Country Wise Reports
          </Menu.Item>
          <Menu.Item key="10" className="menu-item-sub">
            City Wise Reports
          </Menu.Item>
          <Menu.Item key="11" className="menu-item-sub">
            Branch Wise Reports
          </Menu.Item>
          <Menu.Item key="12" className="menu-item-sub">
            Employee Wise Reports
          </Menu.Item>
          <Menu.Item key="13" className="menu-item-sub">
            Service Wise Reports
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
