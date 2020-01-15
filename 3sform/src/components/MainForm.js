import React, { Component } from 'react'

import countries from '../assets/ISO_3166-1_countries_pl.json'

export default class MainForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			emailAddress: "",
			bestCountry: "",
			favouritePet: "",
			luckyNumber: "",
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
			step: 1
		};
		this.handleChange = this.handleChange.bind(this);
		this._validate = this._validate.bind(this);
		this.validate = this.validate.bind(this)
		this._next = this._next.bind(this)
		this._prev = this._prev.bind(this)
		this._send = this._send.bind(this)
	}
	_send() {
		if (this.state.legalConsent1 && this.state.legalConsent1) {
			let lg1 = (this.state.legalConsent1 && this.state.legalConsent1 !== "off") ? true : false;
			let lg2 = (this.state.legalConsent2 && this.state.legalConsent2 !== "off") ? true : false;
			let url = `https://s885580810.t.eloqua.com/e/f2?firstName=${this.state.firstName}&lastName=${this.state.lastName}&emailAddress=${this.state.emailAddress}&bestCountry=${this.state.bestCountry}&favouritePet=${this.state.favouritePet}&luckyNumber=${this.state.luckyNumber}&legalConsent1=${lg1}&legalConsent2=${lg2}&elqFormName=recruitment&elqSiteID=885580810`
			fetch(encodeURI(url))
				.then(res => {
					if (res.ok) {
						this.setState({
							step: 4
						})
					}
				})

			return true
		} else {
			if (!this.state.legalConsent1) {
				this.setState(prevState => ({
					error: {
						...prevState.error,
						legalConsent1: 'Wszystkie zgody są wymagane'
					}
				}))
			} else {
				this.setState(prevState => ({
					error: {
						...prevState.error,
						legalConsent1: ''
					}
				}))
			}
			if (!this.state.legalConsent2) {
				this.setState(prevState => ({
					error: {
						...prevState.error,
						legalConsent2: 'Wszystkie zgody są wymagane'
					}
				}))
			} else {
				this.setState(prevState => ({
					error: {
						...prevState.error,
						legalConsent2: ''
					}
				}))
			}
		}
	}

	_validate(name, value) {
		switch (name) {
			case "firstName":
				if (value.length < 2) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							firstName: 'Imię jest za krótkie'
						}
					}))
					return false
				} else if (/\d/.test(value)) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							firstName: 'Imię nie można zawierać cyfr'
						}
					}))
					return false
				} else {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							firstName: ''
						}
					}))
					return true
				}
			case "lastName":
				if (value.length < 2) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							lastName: 'Nazwisko jest za krótkie'
						}
					}))
					return false
				} else if (/\d/.test(value)) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							lastName: 'Nazwisko nie można zawierać cyfr'
						}
					}))
					return false
				} else {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							lastName: ''
						}
					}))
					return true
				}
			case "emailAddress":
				if (this.validateEmail(value)) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							emailAddress: ''
						}
					}))
					return true
				} else {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							emailAddress: 'Adres e-mail jest nieprawidłowy'
						}
					}))
					return false
				}
			case "bestCountry":
				if (value !== "") {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							bestCountry: ''
						}
					}))
					return true
				} else {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							bestCountry: 'Wybierz państwo'
						}
					}))
					return false
				}
			case "favouritePet":
				if (value !== "") {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							favouritePet: ''
						}
					}))
					return true
				} else {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							favouritePet: 'Wybierz ulubione zwierzę'
						}
					}))
					return false
				}
			case "luckyNumber":
				if (value !== "" && Number(value) > -1) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							luckyNumber: ''
						}
					}))
					return true
				} else if (Number(value) < 0) {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							luckyNumber: 'Wybierz liczbę dodatnią'
						}
					}))
					return false
				} else {
					this.setState(prevState => ({
						error: {
							...prevState.error,
							luckyNumber: 'Wybierz liczbę'
						}
					}))
					return false
				}
		}
	}

	_next() {
		let currentStep = this.state.step
		if (currentStep === 1) {
			this._validate("firstName", this.state.firstName)
			this._validate("lastName", this.state.lastName)
			this._validate("emailAddress", this.state.emailAddress)
			if (this._validate("firstName", this.state.firstName) && this._validate("lastName", this.state.lastName) && this._validate("emailAddress", this.state.emailAddress)) {
				currentStep = currentStep >= 2 ? 3 : currentStep + 1
				this.setState({
					step: currentStep
				})
			}
		} else if (currentStep === 2) {
			this._validate("bestCountry", this.state.bestCountry)
			this._validate("favouritePet", this.state.favouritePet)
			this._validate("luckyNumber", this.state.luckyNumber)
			if (this._validate("bestCountry", this.state.bestCountry) && this._validate("favouritePet", this.state.favouritePet) && this._validate("luckyNumber", this.state.luckyNumber)) {
				currentStep = currentStep >= 2 ? 3 : currentStep + 1
				this.setState({
					step: currentStep
				})
			}
		}

	}

	_prev() {
		let currentStep = this.state.step
		currentStep = currentStep <= 1 ? 1 : currentStep - 1
		this.setState({
			step: currentStep
		})
	}

	get previousButton() {
		let currentStep = this.state.step;
		if (currentStep !== 1) {
			return (
				<div className="cont-btn">
					<div className="wrapper-btn">
						<div className="tsf-bg-btn"></div>
						<button
							className="tsf-btn"
							type="button" onClick={this._prev}>
							Wstecz
							</button>

					</div>
				</div>

			)
		}
		return null;
	}

	get sendButton() {
		if (this.state.step === 3) {
			return (
				<div className="cont-btn">
					<div className="wrapper-btn">
						<div className="tsf-bg-btn"></div>
						<button
							className="tsf-btn"
							type="button" onClick={this._send}>
							Wyślij
			</button>

					</div>
				</div>
			)
		}
	}

	get nextButton() {
		let currentStep = this.state.step;

		if (currentStep < 3) {
			return (
				<div className="cont-btn">
					<div className="wrapper-btn">
						<div className="tsf-bg-btn"></div>
						<button
							className="tsf-btn"
							type="button" onClick={this._next}>
							Dalej
				</button>

					</div>
				</div>
			)
		}
		return null;
	}

	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	validate(event) {
		const { name, value } = event.target
		if (this) {
			this._validate(name, value)
		}
	}



	render() {
		return (
			<div className="center-children">
				<div className="tsf-form-parent">
					<form className="tsf-form">
						<section className={this.state.step === 1 ? "stage" : "stage fade-out"} id="stage-one">
							<div data-validate={this.state.error.firstName} className={this.state.error.firstName ? "wrap-input alert-validate" : "wrap-input"}>
								<input className={
									this.state.firstName ? 'inp has-val' : 'inp'
								} type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} onBlur={this.validate} />
								<span className="focus-input" data-placeholder="Imię"></span>
							</div>
							<div data-validate={this.state.error.lastName} className={this.state.error.lastName ? "wrap-input alert-validate" : "wrap-input"}>
								<input className={
									this.state.lastName ? 'inp has-val' : 'inp'
								} type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} onBlur={this.validate} />
								<span className="focus-input" data-placeholder="Nazwisko"></span>
							</div>
							<div data-validate={this.state.error.emailAddress} className={this.state.error.emailAddress ? "wrap-input alert-validate" : "wrap-input"}>
								<input className={
									this.state.emailAddress ? 'inp has-val' : 'inp'
								} type="text" name="emailAddress" value={this.state.emailAddress} onChange={this.handleChange} onBlur={this.validate} />
								<span className="focus-input" data-placeholder="Email"></span>
							</div>

						</section>


						<section className={this.state.step === 2 ? "stage" : "stage fade-out"} id="stage-two">
							<div data-validate={this.state.error.bestCountry} className={this.state.error.bestCountry ? "sel-par alert-validate" : null}>Najbardziej polecane państwo do odwiedzenia?
						<select className="select-box" value={this.state.bestCountry} onChange={this.handleChange} onBlur={this.validate} name="bestCountry">
									{
										Array.from(countries).map((val, ind) => {
											return <option key={ind} value={val.name_pl}>{val.name_pl} </option>
										})
									}
								</select>
							</div>


							<div data-validate={this.state.error.favouritePet} className={this.state.error.favouritePet ? "rad-par alert-validate" : null}>Wolisz psy czy koty?
						<label className="radio"><input type="radio" name="favouritePet" value="Koty" onChange={this.handleChange} /><span>Koty</span> </label>
								<label className='radio'><input type="radio" name="favouritePet" value="Psy" onChange={this.handleChange} /><span>Psy</span> </label>
							</div>

							<div data-validate={this.state.error.luckyNumber} className={this.state.error.luckyNumber ? "wrap-input alert-validate" : "wrap-input"}>

								<input className={
									this.state.luckyNumber ? 'inp has-val' : 'inp'
								} type="number" name="luckyNumber" value={this.state.luckyNumber} onChange={this.handleChange} onBlur={this.validate} />
								<span className="focus-input" data-placeholder="Szczęśliwa liczba"></span>
							</div>


						</section>



						<section className={this.state.step === 3 ? "stage" : "stage fade-out"} id="stage-three">
							<div data-validate={this.state.error.legalConsent1} className={this.state.error.legalConsent1 ? "legal-box alert-validate" : "legal-box"}>
								<input type="checkbox" id="cbx" name="legalConsent1" style={{ display: 'none' }} checked={this.state.legalConsent1} onChange={this.handleChange} />Wyrażam zgodę nr 1
								<label htmlFor="cbx" className="check">
									<svg width="18px" height="18px" viewBox="0 0 18 18">
										<path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
										<polyline points="1 9 7 14 15 4"></polyline>
									</svg>
								</label>
							</div>
							<div data-validate={this.state.error.legalConsent2} className={this.state.error.legalConsent2 ? "legal-box alert-validate" : "legal-box"}>
								<input type="checkbox" id="cbx2" name="legalConsent2" style={{ display: 'none' }} checked={this.state.legalConsent2} onChange={this.handleChange} />Wyrażam zgodę nr 2
								<label htmlFor="cbx2" className="check">
									<svg width="18px" height="18px" viewBox="0 0 18 18">
										<path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
										<polyline points="1 9 7 14 15 4"></polyline>
									</svg>
								</label>
							</div>
							<input type="hidden" name="elqFormName" value="recruitment" />
							<input type="hidden" name="elqSiteID" value="885580810" />
						</section>
						{this.state.step === 4 ? (<section className="flex-center"> Formularz został wysłany</section>) : null}


						{this.previousButton}
						{this.nextButton}
						{this.state.step === 3 ? this.sendButton : null}

					</form >
				</div>
			</div>
		);
	}

}