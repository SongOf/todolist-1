import request from '../util/request';

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
        *queryInitTodoList(_, sagaEffects) {
            const {call, put} = sagaEffects;
            const endPointURI = 'http://localhost:8080/api/undos';
            const tasks = yield call(request, endPointURI);
            yield put({type: 'initTodoList', payload: tasks});
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
            const nextCounter = state.counter + 1;
            const newTaskWithId = {...newTask, id: nextCounter};
            const nextData = state.data.concat(newTaskWithId);
            return {
                data: nextData,
                counter: nextCounter
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