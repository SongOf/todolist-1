// 注意这里我们除了从antd中引入了Layout布局组件，还引入了Menu菜单组件，Icon图标组件

import {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import Link from 'umi/link';

const {Header, Footer, Sider, Content} = Layout;

const SubMenu = Menu.SubMenu;

export default class BasicLayout extends Component {
    render() {
        return (
            <Layout>
                <Sider width={256} style={{minHeight: '100vh'}}>
                    <div style={{height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                        <Menu.Item key="1">
                            <Link to={"/undos"}>
                                <Icon type="clock-circle"/>
                                <span>Undos</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={"/dones"}>
                                <Icon type="check"/>
                                <span>Dones</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', textAlign: 'center', padding: 0}}>Header</Header>
                    <Content style={{margin: '24px 16px 0'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>TodoList Based on Ant Design ©2018 Created by
                        zeng-tong</Footer>
                </Layout>
            </Layout>
        )
    }
}