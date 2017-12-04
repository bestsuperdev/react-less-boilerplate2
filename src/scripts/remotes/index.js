const {remote} = require('beyond-remote')
const apiBasePath = typeof app !== 'undefined' && app.apiBasePath ? app.apiBasePath : ''

remote.base({
	basePath : apiBasePath
})


/**
 * @return {Promise<Todo2[]>}
 */
export function getTodos(){
	let call = remote.create({url : '/todos'})
	return call()
}

// 
//export const getTodos2 = /** @type {()=>Promise<Todo[]>} */ (remote.create({url : '/todos'}))
