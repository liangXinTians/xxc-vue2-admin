import request from "@/utils/request";
function getApiDepartment(data) {
  return request({
    url: "/web-api/system/dept/list",
    method: "GET",
    params: data
  });
}
function getAipInform(data) {
  return request({
    url: "/web-api/system/notice/list",
    method: "GET",
    params: data
  });
}
function getAipOperation(data) {
  return request({
    url: "/web-api/monitor/operlog/list",
    method: "GET",
    params: data
  });
}
function getAipLogin(data) {
  return request({
    url: "/web-api/monitor/logininfor/list",
    method: "GET",
    params: data
  });
}

export { getApiDepartment, getAipInform, getAipOperation,getAipLogin };
