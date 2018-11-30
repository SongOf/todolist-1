import {Table} from 'antd';
import {Component} from "react";
import {connect} from 'dva';
import {columns} from "./dones";

const namespace = 'taskCards';

const mapStateToProps = (state) => {
    const expiredList = state[namespace].data;
    return {
        expiredList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryList`,
                payload: {URI: "expired/"}
            });
        },
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ExpiredList extends Component {
    componentDidMount() {
        this.props.onDidMount();
    }
    render() {
        const data = this.props.expiredList;
        return <Table columns={columns} dataSource={data}/>;
    }
}