const {remote} = require('beyond-remote')

remote.base({
	basePath : '/api'
})

export const getTodos = remote.create({url : '/todos'})