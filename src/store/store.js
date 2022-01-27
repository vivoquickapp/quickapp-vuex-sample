import Vuex from 'qa-vuex'
import { TASK_STATES } from '../helper/const'
import { setStorage, deepClone } from '../helper/utils'
import createLogger from './../../node_modules/qa-vuex/dist/logger.js'

const updateCurrentTask = (state) => {
  if (state.currentTaskState == TASK_STATES.all) {
    state.currentTasksArr = deepClone(state.tasksArr)
  } else if (state.currentTaskState == TASK_STATES.completed) {
    state.currentTasksArr = state.tasksArr.filter((task) => !task.incomplete)
  } else {
    state.currentTasksArr = state.tasksArr.filter((task) => task.incomplete)
  }
}

export default new Vuex.Store({
  state: {
    tasksArr: [],
    currentTasksArr: [],
    currentTaskState: TASK_STATES.all,
  },

  // NEED FIXED: return array will put the code in a dead loop
  // getters: {
  // currentTasksArr(state) {
  //   if (state.currentTaskState == TASK_STATES.all) {
  //     return deepClone(state.tasksArr)
  //   } else if (state.currentTaskState == TASK_STATES.completed) {
  //     return state.tasksArr.filter((task) => !task.incomplete)
  //   } else {
  //     return state.tasksArr.filter((task) => task.incomplete)
  //   }
  // },
  // },

  mutations: {
    updateTasksArr(state, newTasksArr) {
      state.tasksArr = deepClone(newTasksArr)
      updateCurrentTask(state)
      setStorage(TASK_STATES.task_arr, state.tasksArr)
    },

    updateCurrentTaskState(state, taskState) {
      state.currentTaskState = taskState
      updateCurrentTask(state)
    },
  },

  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
})
