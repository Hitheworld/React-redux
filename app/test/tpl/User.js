import React, {
	Component
} from 'react';

export default class User extends Component {

	constructor(props, context) {
		super(props, context)
	}

	componentDidMount() {
		this.setState({
			// route components are rendered with useful information, like URL params
			user: findUserById(this.props.params.userId)
		})
	}

	render() {
		return (
			<div>
				<h2>{this.state.user.name}</h2>
				{/* etc. */}
			</div>
		)
	}
}