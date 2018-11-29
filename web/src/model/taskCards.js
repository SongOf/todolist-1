import {request, post, update} from '../util/request';

const delay = (millisecond) => {
    return new Promise((resolve => {
        setTimeout(resolve, millisecond);
    }))
};

export default {
    namespace: 'taskCards',
    state: {
        data: [],
        counter: 30,
    },
    effects: {
        * queryInitTodoList(_, sagaEffects) {
            const {call, put} = sagaEffects;
            const endPointURI = 'http://localhost:8080/api/undos/';
            const tasks = yield call(request, endPointURI);
            yield put({type: 'initTodoList', payload: tasks});
        },
        * postNewTask({payload}, sagaEffects) {
            const {call, put} = sagaEffects;
            const endPointURI = 'http://localhost:8080/api/undos/';
            const response = yield call(post, endPointURI, payload);
            yield put({type: 'addNewTask', payload: response})
        },
        * putTask({payload}, sagaEffects) {
            const {call, put} = sagaEffects;
            const endPointURI = 'http://localhost:8080/api/undos/' + payload.id;
            const response = yield call(update, endPointURI, payload);
            yield put({type: 'updateTask', payload: response})
        }
    },
    reducers: {
        initTodoList(state, {payload: tasks}) {
            state.counter = tasks.count;
            state.data = tasks.results;
            return {
                data: state.data,
                counter: state.counter,
            };
        },
        addNewTask(state, {payload: newTask}) {
            const nextData = state.data.concat(newTask);
            state.counter = state.counter + 1
            return {
                data: nextData,
                counter: state.counter
            };
        },
        deleteTask(state, {payload: newTask}) {
            const newData = [...state.data];
            const index = newData.findIndex(item => item.id === newTask.id);
            newData.splice(index, 1);
            state.data = newData;
            return {
                data: state.data,
                counter: state.counter
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
                counter: state.counter
            }
        }
    },
};