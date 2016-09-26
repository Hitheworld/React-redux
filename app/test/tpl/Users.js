import React, {
	Component
} from 'react';

export default class Users extends Component {
	render() {
		return (
			<div>
				<h1>Users</h1>
				<div className="master">
					<ul>
						{/* use Link to route around the app */}
						{this.state.users.map(user => (
							<li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>
						))}
					</ul>
				</div>
				<div className="detail">
					{this.props.children}
				</div>
			</div>
		)
	}
}/**
 * Created by Administrator on 2016/9/26.
 */
