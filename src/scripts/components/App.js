/// @ts-nocheck

import React from 'react'
import {getTodos} from '../remotes'

const styles = require('./styles.less')


export default class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			todos : []
		}
	}

	componentDidMount() {
		getTodos()
			.then((todos)=>{
				this.setState({todos})
			})
	}
	

	render() {
		return (
			<div className='app'>
				<h1>todos</h1>
				<ul>
					{this.state.todos.map((item)=> <li className={styles.todo} key={item.id}>{item.text}</li> )}
				</ul>
			</div>
		)
	}
}