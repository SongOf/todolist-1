import React, {Component} from 'react';
import {Card, Button} from 'antd';
import TaskInput from "./dones";

export default class CardsPage extends Component {
    constructor(props) {
        super(props);
        this.counter = 100;
        this.state = {
            cardList: [
                {
                    "id": 6,
                    "todo": "fu***k",
                    "status": "0",
                    "priority": "2",
                    "created_at": "2018-11-27T11:43:31.896392Z",
                    "expired_at": null
                },
                {
                    "id": 7,
                    "todo": "using mixins coding",
                    "status": "0",
                    "priority": "2",
                    "created_at": "2018-11-27T13:58:08.602763Z",
                    "expired_at": null
                },
                {
                    "id": 4,
                    "todo": "hello world",
                    "status": "0",
                    "priority": "0",
                    "created_at": "2018-11-27T07:37:34.542795Z",
                    "expired_at": null
                }
            ],
        }
    }

    addNewTask = () => {
        this.setState(prevState => {
            const prevCardList = prevState.cardList;
            this.counter += 1;
            const card = {
                id: this.counter,
                todo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
                status: 'default 0',
                priority: 'default 0',
                created_at: '',
                expired_at: 'default null'
            };
            return {
                cardList: prevCardList.concat(card),
            };
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.cardList.map(card => {
                        return (
                            <Card key={card.id}>
                                <div>Task: {card.todo}</div>
                            </Card>
                        );
                    })
                }
                <div>
                    <Button onClick={this.addNewTask}> Add Task </Button>
                </div>
            </div>
        );
    }
}