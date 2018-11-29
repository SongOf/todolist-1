import React, {Component} from 'react';
import {Input, DatePicker, Dropdown, Icon, Menu, message} from 'antd';

const InputGroup = Input.Group;

export default class TaskInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputMsg: '',
            value: '',
        }
    }

    onChangeMsg = (e) => (
        this.setState({inputMsg: e.target.value})
    );

    onChangePriority = (value) => (
        this.setState({value})
    );

    handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    ratePriority = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="1"><Icon type="flag"/>priority 1</Menu.Item>
            <Menu.Item key="2"><Icon type="flag"/>priority 2</Menu.Item>
            <Menu.Item key="3"><Icon type="flag"/>priotity 3</Menu.Item>
        </Menu>
    );

    render() {
        return (
            <div>
                <div>
                    <InputGroup compact>
                        <Input style={{width: '50%'}} onChange={this.onChangeMsg} onPressEnter={() => {
                            message.info(this.state.inputMsg)
                        }} placeholder="add something ~(≧▽≦)/~"/>
                        <DatePicker onChange={date => {
                            console.log(date)
                        }} placeholder={"Schedule"}/>
                        <Dropdown.Button onClick={(e) => {
                            console.log(e)
                        }} overlay={this.ratePriority}>
                            priority
                        </Dropdown.Button>
                    </InputGroup>
                </div>
            </div>
        );
    }
}