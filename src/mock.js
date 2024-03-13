import { get } from 'js-cookie'
import Mock from 'mockjs'
const Random = Mock.Random


//首页数据
function getHome () {
  let datalist =
    { ipFlowDay: 210, uvFlowDay: 140, pvFlowDay: 410, ipAllFlow: 510 }
  return {
    data: datalist
  }
}

// 用户管理
function getUseStudent () {
  let datalist = [
    {
      name: '梁心田',
      phone: '13512345678',
      id: '20201544309',
      status: true,
      createTime: '2023-03-01',
      age: "20",
    },
    {
      name: '孙',
      phone: '13512345678',
      id: '20201544308',
      status: false,
      createTime: '2023-03-01',
      age: "20",
    },
    {
      name: '梁心田',
      phone: '13512345678',
      id: '20201544307',
      status: true,
      createTime: '2023-03-01',
      age: "20",
    },
    {
      name: '梁心田',
      phone: '13512345678',
      id: '20201544306',
      status: false,
      createTime: '2023-03-01',
      age: "20",
    },
    {
      name: '梁心田',
      phone: '13512345678',
      id: '20201544305',
      status: true,
      createTime: '2023-03-01',
      age: "20",
    },
    {
      name: '梁心田',
      phone: '13512345678',
      id: '20201544304',
      status: true,
      createTime: '2023-03-01',
      age: "20",
    },
    {
      name: '梁心田',
      phone: '13512345678',
      id: '20201544303',
      status: false,
      createTime: '2023-03-01',
      age: "20",
    },
  ]
  return {
    data: datalist
  }
}

// 回收员管理
function getUseChange () {
  let datalist = [
    {
      name: '梁心田',
      phone: '13512345678',
      id: '20201544309',
      status: '0',
      createTime: '2023-03-01',
      age: "20",
    },
    {
      name: '孙',
      phone: '13512345678',
      id: '20201544309',
      status: '0',
      createTime: '2023-03-01',
      age: "20",
    },
    {
      name: '梁心田',
      phone: '13512345678',
      id: '20201544309',
      status: '0',
      createTime: '2023-03-01',
      age: "20",
    },
    {
      name: '梁心田',
      phone: '13512345678',
      id: '20201544309',
      status: '0',
      createTime: '2023-03-01',
      age: "20",
    },
    {
      name: '梁心田',
      phone: '13512345678',
      id: '20201544309',
      status: '1',
      createTime: '2023-03-01',
      age: "20",
    },
    {
      name: '梁心田',
      phone: '13512345678',
      id: '20201544309',
      status: '0',
      createTime: '2023-03-01',
      age: "20",
    },
    {
      name: '梁心田',
      phone: '13512345678',
      id: '20201544309',
      status: '0',
      createTime: '2023-03-01',
      age: "20",
    },
  ]

  return {
    data: datalist
  }
}

// 回收管理
function getProduct () {
  let datalist =
    { ipFlowDay: 210, uvFlowDay: 140, pvFlowDay: 410, ipAllFlow: 510 }
  return {
    data: datalist
  }
}


const getHomes = Mock.mock('/getHome', getHome)
const getUseStudents = Mock.mock('/getUseStudent', getUseStudent)
const getUseChanges = Mock.mock('/getUseChange', getUseChange)
const getProducts = Mock.mock('/getProducts', getProduct)
export default { getHomes, getUseStudents, getUseChanges, getProducts }
