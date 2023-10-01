// Eliminate asynchronous infection
async function getUserInfo() {
  return await fetch('./xxx.json');
}
async function getAuthByUserId() {
  const userInfo = await getUserInfo();
  return userInfo.auth;
}
function getUserPagesByAuth() {

}