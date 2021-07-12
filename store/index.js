const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要 state 定义成函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxtServerInit 是 nuxt 中特殊的 action 方法
  // 这个 action 会在服务端渲染期间自动调用
  // 主要用来初始化容器数据，传递给客户端使用
  // commit： 用于提交 mutations 中的方法
  // req： 请求对象
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转为 js 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}