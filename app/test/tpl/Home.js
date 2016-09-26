import React, {
	Component
} from 'react';

export default class Home extends Component {
	render() {
		return (
			<div>
				<h1>Home</h1>
				<p>999 夺标777胡夺</p>
				<div className="detail">
					{this.props.children}
				</div>
			</div>
		)
	}
}