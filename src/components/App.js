import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Navbar from './Navbar';

class App extends Component {

	async componentWillMount() {
		await this.loadWeb3()
		await this.loadBlockChainData()
	}

	async loadWeb3(){
		if(window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
		} else {
			window.alert('Non-ethereum browser detected. You should consider trying Metamask!')
		}
	}

	async loadBlockChainData() {
		const web3 = window.web3
		
		// Load the account
		const accounts = await web3.eth.getAccounts()
		this.setState({ account: accounts[0] })
	}

	constructor(props){
		super(props)
		this.state = {
			account: ''
		}
	}

	render() {
		return (
			<div>
				<Navbar account={this.state.account} />
				<div className="container-fluid mt-5">
					<div className="row">
						<main role="main" className="col-lg-12 d-flex text-center">
							<div className="content mr-auto ml-auto">
								<a
									href="http://www.dappuniversity.com/bootcamp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={logo} className="App-logo" alt="logo" />
								</a>
								<h1>Dapp University Starter Kit</h1>
								<p>
									Edit <code>src/components/App.js</code> and save to reload.
								</p>
								<a
									className="App-link"
									href="http://www.dappuniversity.com/bootcamp"
									target="_blank"
									rel="noopener noreferrer"
								>
									LEARN BLOCKCHAIN <u><b>NOW! </b></u>
								</a>
							</div>
						</main>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
