import Vuex from 'qa-vuex'
import { TASK_STATES } from '../helper/const'
import { setStorage, deepClone } from '../helper/utils'
import createLogger from './../../node_modules/qa-vuex/dist/logger.js'

export default new Vuex.Store({
  state: {
    tasksArr: [],
    currentTaskState: TASK_STATES.all,
  },

  // Fixed in qa-vuex 1.0.3 version @2022.02.08
  getters: {
    currentTasksArr(state) {
      if (state.currentTaskState == TASK_STATES.all) {
        return deepClone(state.tasksArr)
      } else if (state.currentTaskState == TASK_STATES.completed) {
        return state.tasksArr.filter((task) => !task.incomplete)
      } else {
        return state.tasksArr.filter((task) => task.incomplete)
      }
    },
  },

  mutations: {
    updateTasksArr(state, newTasksArr) {
      state.tasksArr = deepClone(newTasksArr)
      setStorage(TASK_STATES.task_arr, state.tasksArr)
    },

    updateCurrentTaskState(state, taskState) {
      state.currentTaskState = taskState
    },
  },

  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
})
