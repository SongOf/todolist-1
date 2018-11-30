import {request, post, update} from '../util/request';
import {DELETE, UPDATE, DONE, EXPIRED} from "../util/constant";
import {message} from 'antd';

const delay = (millisecond) => {
    return new Promise((resolve => {
        setTimeout(resolve, millisecond);
    }))
};

export default {
    namespace: 'taskCards',
    state: {
        data: [],
    },
    effects: {
        * queryList({payload}, sagaEffects) {
            const {call, put} = sagaEffects;
            const endPointURI = 'http://localhost:8080/api/' + payload.URI;
            const tasks = yield call(request, endPointURI);
            yield put({type: 'initList', payload: tasks});
        },
        * postNewTask({payload}, sagaEffects) {
            const {call, put} = sagaEffects;
            const endPointURI = 'http://localhost:8080/api/undos/';
            const response = yield call(post, endPointURI, payload);
            yield put({type: 'addNewTask', payload: response})
        },
        * putTask({payload}, sagaEffects) {
            const {call, put} = sagaEffects;
            const endPointURI = 'http://localhost:8080/api/undos/' + payload.task.id;
            const response = yield call(update, endPointURI, payload.task);
            switch (payload.operate) {
                case DONE:
                    yield put({type: 'hideTask', payload: response});
                    break;
                case DELETE:
                    yield put({type: 'hideTask', payload: response});
                    break;
                case UPDATE:
                    yield put({type: 'updateTask', payload: response});
                    break;
                default:
                    message.error("bad operate.")
            }
        }
    },
    reducers: {
        initList(state, {payload: tasks}) {
            state.data = tasks;
            return {
                data: state.data,
            };
        },
        addNewTask(state, {payload: newTask}) {
            const nextData = state.data.concat(newTask);
            return {
                data: nextData,
            };
        },
        hideTask(state, {payload: newTask}) {
            const newData = [...state.data];
            const index = newData.findIndex(item => item.id === newTask.id);
            newData.splice(index, 1);
            state.data = newData;
            return {
                data: state.data,
            };
        },
        updateTask(state, {payload: row}) {
            const newData = [...state.data];
            const index = newData.findIndex(item => row.id === item.id);
            const item = newData[index];
            newData.splice(index, 1, {
                ...item,
                ...row,
            });
            state.data = newData;
            return {
                data: state.data,
            }
        }
    },
};