/**
 * Remove useless chart from URI
 *
 * trimUrl("/arya/projects/a3daf80d"); // 'a3daf80d'
 */
const trimUrl = (value) => value?.split('/')?.slice(-1)?.join();

export default trimUrl;
