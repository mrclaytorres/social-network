import React, { Component } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json'
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

		// Connect and get the Smart Contract
		const networkId = await web3.eth.net.getId()
		const networkData = SocialNetwork.networks[networkId]

		if(networkData) {
			// Save the contract data into the component state
			const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
			this.setState({ socialNetwork })

			// Get the postCount and set into the component state
			const postCount = await socialNetwork.methods.postCount().call()
			this.setState({ postCount })
			
			// Load Posts
			for (var i = 0; i <= postCount; i++){
				const post = await socialNetwork.methods.posts(i).call()
				this.setState({
					posts: [...this.state.posts, post]
				})
			}
			console.log({ posts: this.state.posts })
		} else {
			window.alert('SocialNetwork contract not deployed to detected network.')
		}
		// Address
		// ABI
	}

	constructor(props){
		super(props)
		this.state = {
			account: '',
			socialNetwork: null,
			postCount: 0,
			posts: []
		}
	}

	render() {
		return (
			<div>
				<Navbar account={this.state.account} />
				<div className="container-fluid mt-5">
					<div className="row">
						<main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
							{this.state.posts.map((post, key) => {
								return(
									<div className="card mb-4" key={key}>
										<div className="card-header">
											<img
											className='m3-2'
											width='30'
											height='30'
											src={`data:image/png;base64, ${new Identicon(this.state.account, 30).toString()}`}
											/>
											<small className="text-muted">{post.author}</small>
										</div>
										<ul id="postList" className="list-group list-group-flush">
											<li className="list-group-item">
												<p>{post.content}</p>
											</li>
											<li key={key} className="list-group-item py-2">
												<small className="float-left mt-1 text-muted">
													TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
												</small>
												<button className="btn btn-link btn-sm float-right pt-0">
													<span>
														TIP 0.1 ETH
													</span>
												</button>
											</li>
										</ul>
									</div>
								)
							})}
						</main>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
