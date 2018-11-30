import {Table} from 'antd';
import {Component} from "react";
import {connect} from 'dva';

export const columns = [{
    title: 'Content',
    dataIndex: 'todo',
    sorter: (a, b) => a.todo.length - b.todo.length,
}, {
    title: 'Priority',
    dataIndex: 'priority',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.priority - b.priority,
}, {
    title: 'Created Time',
    dataIndex: 'created_at',
    sorter: (a, b) => a.created_at - b.created_at,
},
    {
        title: 'Expired Time',
        dataIndex: 'expired_at',
        sorter: (a, b) => a.expired_at - b.expired_at,
    },
];

const namespace = 'taskCards';


const mapStateToProps = (state) => {
    const doneList = state[namespace].data;
    return {
        doneList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryList`,
                payload: {URI:'dones/'}
            });
        },
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class DoneList extends Component {
    componentDidMount() {
        this.props.onDidMount();
    }

    render() {
        const data = this.props.doneList;
        return <Table columns={columns} dataSource={data}/>;
    }
}