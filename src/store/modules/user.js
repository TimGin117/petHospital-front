import { login, register, thirdLogin, userInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  id: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ stuId: username.trim(), pwd: password }).then(response => {
        const { data } = response
        const { token, user } = data
        debugger
        commit('SET_TOKEN', token)
        commit('SET_AVATAR', user.avatar)
        commit('SET_ID', user.stuId)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  loginAuto({ commit }, info) {
    const { token, stuId } = info
    commit('SET_TOKEN', token)
    setToken(token)

    return userInfo({ stuId }).then(response => {
      const { data } = response
      commit('SET_AVATAR', data.avatar)
      commit('SET_ID', data.stuId)
      Message.success('登录成功')
    })
  },

  thirdLogin({ commit }) {
    return new Promise((resolve, reject) => {
      thirdLogin().then(response => {
        const { data } = response
        window.location.href = data
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  register({ commit }, userInfo) {
    const { username, password, socialUsrId } = userInfo
    return new Promise((resolve, reject) => {
      register({ stuId: username.trim(), pwd: password.trim(), socialUsrId }).then(response => {
        const { data } = response
        if (data) {
          Message.success('注册成功')
        } else {
          Message.error('注册失败')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
