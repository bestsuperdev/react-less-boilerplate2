const {remote} = require('beyond-remote')
const apiBasePath = typeof window !== 'undefined' && window.app && window.app.apiBasePath ? window.app.apiBasePath : ''
remote.base({
	basePath : apiBasePath
})

export const getTodos = remote.create({url : '/todos'})