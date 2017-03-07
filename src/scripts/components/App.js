import React from 'react'
import {getTodos} from 'scripts/remotes'
export default class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			todos : []
		}
	}

	componentDidMount() {
		// getTodos()
		// .then((todos)=>{
		// 	this.setState({todos})
		// })
	}

	render() {
		return (
			<div className='app'>
				please enjoy it~
			</div>
		)
	}
}