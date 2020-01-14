import React, { Component } from 'react'

import countries from '../assets/ISO_3166-1_countries_pl.json'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export default class MainForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			emailAddress: "",
			bestCountry: "",
			favouritePet: "",
			luckyNumber: null,
			legalConsent1: false,
			legalConsent2: false,
			error: {
				firstName: "",
				lastName: "",
				emailAddress: "",
				bestCountry: "",
				favouritePet: "",
				luckyNumber: "",
				legalConsent1: "",
				legalConsent2: "",
			},
			finalValidate: false,
			buttonText: "Dalej"
		};
		this.handleChange = this.handleChange.bind(this);
		this.validate = this.validate.bind(this);
	}

	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	handleChange(event) {
		console.log(event.target)
		this.setState({ [event.target.name]: event.target.value });
	}


	validate(event) {
		const { name, value } = event.target

		console.log()
		switch (name) {
			case "firstName":
				if (value.length < 2) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							firstName: 'Imię jest za krótkie'
						}
					}))
				} else if (/\d/.test(value)) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							firstName: 'Imię nie można zawierać cyfr'
						}
					}))
				} else {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							firstName: ''
						}
					}))
				}
				break;
			case "lastName":
				if (value.length < 2) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							lastName: 'Nazwisko jest za krótkie'
						}
					}))
				} else if (/\d/.test(value)) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							lastName: 'Nazwisko nie można zawierać cyfr'
						}
					}))
				} else {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							lastName: ''
						}
					}))
				}
				break;
			case "emailAddress":
				if (this.validateEmail(value)) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							emailAddress: ''
						}
					}))
				} else {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							emailAddress: 'Adres e-mail jest nieprawidłowy'
						}
					}))
				}
				break;
		}
		console.log(this.state)
	}


	render() {
		return (
			<form>
				<section className="stage" id="stage-one">
					<p>Imię <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} onBlur={this.validate} /></p>
					<p>{this.state.error.firstName}</p>
					<p>Nazwisko <input type="text" placeholder="Nazwisko" name="lastName" value={this.state.lastName} onChange={this.handleChange} onBlur={this.validate} /></p>
					<p>{this.state.error.lastName}</p>
					<p>Email <input type="text" placeholder="Email" name="emailAddress" value={this.state.emailAddress} onChange={this.handleChange} onBlur={this.validate} /></p>
					<p>{this.state.error.emailAddress}</p>
				</section>
				<section className="stage" id="stage-two">
					<p>Najbardziej polecane państwo do odwiedzenia?
						<select value={this.state.bestCountry} onChange={this.handleChange} onBlur={this.validate} name="bestCountry">
							{
								Array.from(countries).map((val, ind) => {
									return <option key={ind} value={val.name_pl}>{val.name_pl} </option>
								})
							}
						</select>
					</p>
					<div>Wolisz psy czy koty?
						<label><input type="radio" name="favouritePet" value="Koty" onChange={this.handleChange} />Koty </label>
						<label><input type="radio" name="favouritePet" value="Psy" onChange={this.handleChange} />Psy </label>
					</div>
					<div>Szczęśliwa liczba<input type="number" placeholder="Liczba" name="luckyNumber" /></div>
				</section>
				<section className="stage" id="stage-three">
					<div><label>Wyrażam zgodę nr 1 <input type="checkbox" name="legalConsent1" /></label></div>
					<div><label>Wyrażam zgodę nr 2  <input type="checkbox" name="legalConsent2" /></label></div>
					<input type="hidden" name="elqFormName" value="recruitment" />
					<input type="hidden" name="elqSiteID" value="885580810" />
				</section>
				<button>Wstecz </button>
				<button>{this.state.buttonText} </button>
			</form >
		);
	}

	// render() {
	// 	return (
	// 		<form>

	// 			<Step1 firstName={this.state.firstName} lastName={this.state.lastName} emailAddress={this.state.emailAddress} error={this.state.error} />
	// 			<Step2 />
	// 			<Step3 />
	// 		</form>
	// 	)
	// }
}