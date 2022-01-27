/**
 * 您可以将常用的方法、或系统 API，统一封装，暴露全局，以便各页面、组件调用，而无需 require / import.
 */
const prompt = require('@system.prompt')
const storage = require('@system.storage')

function validatingJSON(json) {
  let checkedjson
  try {
    checkedjson = JSON.parse(json)
  } catch (err) {
    console.log(new Error(`Something Error: ${err}`))
  }
  return checkedjson
}

export function showToast(message = '', duration = 0) {
  if (!message) return
  prompt.showToast({
    message: message,
    duration,
  })
}

export function setStorage(key, value) {
  storage.set({
    key: key,
    value: JSON.stringify(value),
  })
}

export function getStorage(key) {
  return new Promise((resolve, reject) => {
    storage
      .get({
        key,
      })
      .then((res) => {
        resolve(validatingJSON(res.data))
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function showPrompt(message = '') {
  return prompt.showDialog({
    message: message,
    buttons: [
      {
        text: '确定',
        color: '#ec5840',
      },
      {
        text: '取消',
        color: '#33dd44',
      },
    ],
  })
}

function find(list, f) {
  return list.filter(f)[0]
}

export function deepClone(obj, cache = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const hit = find(cache, (c) => c.original === obj)
  if (hit) {
    return hit.copy
  }
  const copy = Array.isArray(obj) ? [] : {}
  cache.push({
    original: obj,
    copy,
  })
  Object.keys(obj).forEach((key) => {
    copy[key] = deepClone(obj[key], cache)
  })
  return copy
}
