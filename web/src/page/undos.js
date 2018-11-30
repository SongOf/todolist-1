import React, {Component} from 'react';
import {Table, Input, DatePicker, Dropdown, Menu, Button, Popconfirm, Form, Icon, message} from 'antd';
import {connect} from 'dva';
import {DELETE, DONE, EXPIRED, UPDATE} from "../util/constant";

const InputGroup = Input.Group;

const namespace = 'taskCards';

const mapStateToProps = (state) => {
    const todoList = state[namespace].data;
    return {
        todoList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: (newTask) => {
            const action = {
                type: `${namespace}/postNewTask`,
                payload: newTask,
            };
            dispatch(action);
        },
        onClickUpdate: (task, operation) => {
            task.status = operation;
            const action = {
                type: `${namespace}/putTask`,
                payload: {task: task, operate: operation},
            };
            dispatch(action);
        },
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryList`,
                payload: {URI: 'undos/'}
            });
        },
    };
};

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
    state = {
        editing: false,
    };

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({editing}, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    handleClickOutside = (e) => {
        const {editing} = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    };

    save = () => {
        const {record, handleSave} = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({...record, ...values});
        });
    };

    render() {
        const {editing} = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{margin: 0}}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save}
                                            />
                                        )}
                                    </FormItem>
                                ) : (
                                    <div
                                        className="editable-cell-value-wrap"
                                        style={{paddingRight: 24}}
                                        onClick={this.toggleEdit}
                                    >
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class EditableTable extends Component {

    inputMessge = {
        todo: '',
        priority: '0',
        expired_at: '',
        status: '0',
    };

    componentDidMount() {
        this.props.onDidMount();
    }

    columns = [{
        title: 'Content',
        dataIndex: 'todo',
        width: '30%',
        editable: true,
        sorter: (a, b) => a.todo.length - b.todo.length
    }, {
        title: 'Priority',
        dataIndex: 'priority',
        editable: true,
        sorter: (a, b) => a.priority - b.priority
    }, {
        title: 'Expired Day',
        dataIndex: 'expired_at',
        editable: true,
        sorter: (a, b) => a.priority - b.priority
    }, {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
            return (
                this.props.todoList.length >= 1
                    ? (
                        <div>
                            <Popconfirm title="1 item finished?" icon={<Icon type="check-circle" style={{color: 'green'}}/>}
                                        onConfirm={() => {
                                            this.props.onClickUpdate(record, DONE)
                                        }}>
                                <a href="javascript:;">Done</a>
                            </Popconfirm>
                            &nbsp;&nbsp;
                            <Popconfirm title="Sure to delete?" placement="right" onConfirm={() => {
                                this.props.onClickUpdate(record, DELETE)
                            }}>
                                <a href="javascript:;">Delete</a>
                            </Popconfirm>
                        </div>
                    ) : null
            );
        },
    }];

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: (row) => {
                        this.props.onClickUpdate(row, UPDATE);
                    },
                }),
            };
        });

        const onChangeMsg = (e) => (
            this.inputMessge.todo = e.target.value
        );

        const handleMenuClick = (e) => {
            message.info('Priority ' + e.key);
            this.inputMessge.priority = e.key;
        };

        const ratePriority = (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="1"><Icon type="flag"/>priority 1</Menu.Item>
                <Menu.Item key="2"><Icon type="flag"/>priority 2</Menu.Item>
                <Menu.Item key="3"><Icon type="flag"/>priority 3</Menu.Item>
                <Menu.Item key="4"><Icon type="flag"/>priority 4</Menu.Item>
            </Menu>
        );
        return (
            <div>
                <div style={{float: "left", border: "1px", width: "100%"}}>
                    <div style={{float: "left", border: "1px", width: "15%"}}>
                        <Button onClick={() => {
                            if(this.inputMessge.expired_at === '') message.error("Please select a time.");
                            const newTask = {
                                todo: this.inputMessge.todo,
                                priority: this.inputMessge.priority,
                                status: this.inputMessge.status,
                                expired_at: this.inputMessge.expired_at
                            };
                            this.props.onClickAdd(newTask)
                        }} type="primary" style={{marginBottom: 16}}>
                            Add a Task
                        </Button>
                    </div>
                    <div style={{float: "left", border: "1px", width: "80%"}}>
                        <InputGroup compact>
                            <Input style={{width: '50%'}} onChange={onChangeMsg} onPressEnter={() => {
                                message.info(this.inputMessge.todo)
                            }} placeholder="add something ~(≧▽≦)/~"/>
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={date => {
                                    if (date != null) this.inputMessge.expired_at = date.format('YYYY-MM-DD HH:mm:ss');
                                    console.log(this.inputMessge.expired_at);
                                }} placeholder={"Schedule"}/>
                            <Dropdown.Button onClick={(e) => {
                                this.inputMessge.priority = ''
                            }} overlay={ratePriority}>
                                priority &nbsp; {this.inputMessge.priority}
                            </Dropdown.Button>
                        </InputGroup>
                    </div>
                </div>
                <br></br>
                <Table pagination={{pageSize: 8}}
                       components={components}
                       rowClassName={() => 'editable-row'}
                       bordered
                       dataSource={this.props.todoList}
                       columns={columns}
                />
            </div>
        );
    }
}