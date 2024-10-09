/*
 * @Author: Michael19522462886 2632044037@qq.com
 * @Date: 2024-09-19 11:32:37
 * @LastEditors: Michael19522462886 2632044037@qq.com
 * @LastEditTime: 2024-10-09 15:50:07
 * @FilePath: \pzadmin_me\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '../utils/request'
// 获取验证码接口
export function getCode(data) {
  return request({
    url: '/get/code',
    method: 'post',
    data
  })
}
// 验证码验证接口
export function userAuthentication(data) {
  return request({
    url: '/user/authentication',
    method: 'post',
    data
  })
}
// 登录接口
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
// 账号管理列表
export function authAdmin(params){
  return request({
    url: '/auth/admin',
    method: 'get',
    params: params
  })
}
// 菜单权限控制
export function userGetmenu(params){
  return request({
    url: '/user/getmenu',
    method: 'get',
    params: params
  })
}
// 权限修改
export function userSetmenu(data){
  return request({
    url: '/user/setmenu',
    method: 'post',
    data
  })
}
// 菜单权限列表
export function menuList(params){
  return request({
    url: '/menu/list',
    method: 'get',
    params: params
  })
}
// 管理员权限列表
export function menuSelectlist(params){
  return request({
    url: '/menu/selectlist',
    method: 'get',
    params: params
  })
}
// 更新权限
export function updateAdmin(data) {
  return request({
    url: '/update/user',
    method: 'post',
    data
  })
}
  //用户菜单权限
export function getPermissions() {
  return request({
    url: '/menu/permissions',
    method: 'get',
    // params: params
  })
}
// 员工列表
export function companionList(params) {
  return request({
    url: '/companion/list',
    method: 'get',
    params: params
  })
}
// 修改员工信息
export function addCompanion(data) {
  return request({
    url: '/companion',
    method: 'post',
    data
  })
}
export function getPhotoList(params) {
  return request({
    url: '/photo/list',
    method: 'get',
    // params: params
  })
}
// 删除员工
export function deleteCompanion(data) { 
  return request({
    url: '/delete/companion',
    method: 'post',
    data: { id: data }, // 将 data.id 作为请求体数据发送
  });
}

