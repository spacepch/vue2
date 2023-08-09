import request from "@/utils/request";

/**
 * 获取B站用户信息
 * @param {*} keyWord B站用户uid
 * @returns Promise对象
 */
export const getBiliInfoAPI = (keyword) => {
  return request({
    url: "/api/bili",
    params: { keyword },
  });
};

/**
 * 获取QQ用户信息
 * @param {*} keyWord QQ帐号
 * @returns 含两个Promise对象的数组
 */
export const getQqinfoAPI = (keyword) => {
  return request({
    url: '/api/qq',
    params: { keyword }
  });
};

/**
 * 获取github用户信息
 * @param {*} keyWord github用户名
 * @returns PRomise对象
 */
export const getGithubInfoAPI = (keyword) => {
  return request({
    url: `/api/github`,
    params: { keyword }
  })
}

/**
 * 
 * @param {*} keyword 
 * @param {*} page 
 * @returns 
 */
export const getBiliUserListAPI = (keyword, page, page_size, order, order_sort, user_type) => {
  return request({
    url: '/api/biliList',
    params: {
      keyword, page, page_size, order, order_sort, user_type
    }
  })
}