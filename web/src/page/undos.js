import React, {Component} from 'react';
import {Table, Input, Button, Popconfirm, Form} from 'antd';
import {connect} from 'dva';

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
                type: `${namespace}/addNewTask`,
                payload: newTask,
            };
            dispatch(action);
        },
        onClickDelete: (task) => {
            const action = {
                type: `${namespace}/deleteTask`,
                payload: task,
            };
            dispatch(action);
        },
        onClickUpdate: (task) => {
            const action = {
                type: `${namespace}/updateTask`,
                payload: task,
            };
            dispatch(action);
        }
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
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
            return (
                this.props.todoList.length >= 1
                    ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => {
                            record.status = 2 // delete
                            this.props.onClickDelete(record)
                        }}>
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
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
                        this.props.onClickUpdate(row);
                    },
                }),
            };
        });
        return (
            <div>
                <Button onClick={() => {
                    const newTask = {
                        todo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        priority: '2',
                    };
                    this.props.onClickAdd(newTask)
                }} type="primary" style={{marginBottom: 16}}>
                    Add a row
                </Button>
                <Table
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