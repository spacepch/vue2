import request from '@/utils/request'

/**
 * 注册接口
 * @param {*} param0 { username: 用户名, password: 密码 }
 * @returns Promise对象
 */
export const registerAPI = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}

/**
 * 登录接口
 * @param {*} param0 { username: 用户名, password: 密码 }
 * @returns Promise对象
 */
export const loginApi = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

/**
 * 请求用户信息接口
 * @returns Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
  })
}

/**
 * 获取菜单栏数据接口
 * @returns Promise 对象
 */
export const getMenusListAPI = () => {
  return request({
    url: '/my/menus'
  })
}

/**
 * 更新-基本资料
 * @param {*} param0
 * @returns
 */
export const updateUserInfoAPI = ({ id, username, nickname, email, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'put',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}

/**
 * 更换头像
 * @param {*} avatar 头像图片base64字符串
 * @returns Promise对象
 */
export const uploadUserAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

/**
 * 重置密码
 * @param {*} param0 { old_pwd:旧密码, new_owd:新密码, re_pwd:确认密码 }
 * @returns Promise对象
 */
export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}

/**
 * 获取文章列表
 * @returns Promise
 */
export const getArtCateListAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}

/**
 * 增加文章分类
 * @param {*} param0 { cate_name:文章分类名, cate_alias：分类别名 }
 * @returns Promise对象
 */
export const saveArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}

/**
 * 修改文章分类
 * @param {*} param0 { id:分类id, cate_name:分类名称, cate_alias:分类别名 }
 * @returns Promise 对象
 */
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: 'my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}

/**
 * 删除文章分类
 * @param {*} param0 id:
 * @returns Promise
 */
export const deleteArtCateAPI = (id) => {
  return request({
    url: 'my/cate/del',
    method: 'delete',
    params: {
      id
    }
  })
}

/**
 * 提交 文章
 * @param {*} formDate FormData 表单数据对象
 * @returns Promise 对象
 */
export const uploadArticleAPI = (formDate) => {
  return request({
    url: 'my/article/add',
    method: 'POST',
    data: formDate
  })
}

/**
 * 获取-文章列表
 * @param {*} param0 { pagenum:当前页码, pagesize：当前需要数据条数, cate_id：文章分类, state：文章状态 }
 * @returns Prommise 对象
 */
export const getArtListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: 'my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}

/**
 * 获取-文章详情
 * @param {*} id 文章id
 * @returns Promise 对象
 */
export const getArtDetailAPI = (id) => {
  return request({
    url: '/my/article/info',
    params: { id }
  })
}
