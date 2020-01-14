import React, { Component } from 'react'

export default class Step1 extends Component {
	constructor(props) {
		super(props);
	}

	handleChange(event) {
		console.log(event.target)
		this.setprops({ [event.target.name]: event.target.value });
	}
	render() {
		return (
			<section className="stage" id="stage-one">
				<div>Imię <input type="text" name="firstName" value={this.props.firstName} onChange={this.handleChange} onBlur={this.validate} /></div>
				<div>{this.props.error.firstName}</div>
				<div>Nazwisko <input type="text" placeholder="Nazwisko" name="lastName" value={this.props.lastName} onChange={this.handleChange} onBlur={this.validate} /></div>
				<div>{this.props.error.lastName}</div>
				<div>Email <input type="text" placeholder="Email" name="emailAddress" value={this.props.emailAddress} onChange={this.handleChange} onBlur={this.validate} /></div>
				<div>{this.props.error.emailAddress}</div>
			</section>
		)
	}
}
