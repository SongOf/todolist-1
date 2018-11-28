import React, {Component} from 'react';
import {Input, DatePicker, message} from 'antd';

const InputGroup = Input.Group;

export default class TaskInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputMsg: ''
        }
    }
    onChangeMsg = (e) => (
        this.setState({inputMsg: e.target.value})
    );

    render() {
        return (
            <div>
                <div>
                    <InputGroup compact>
                        <Input style={{width: '50%'}} onChange={this.onChangeMsg} onPressEnter={ ()=>{
                            message.info(this.state.inputMsg)
                        }} placeholder="add something ~(≧▽≦)/~"/>
                        <DatePicker onChange={date => {
                            console.log(date)
                        }}/>
                    </InputGroup>
                </div>
            </div>
        );
    }
}