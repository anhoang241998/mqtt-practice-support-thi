import React, { useState } from "react"

export default function Connection({ connect, disconnect, connectBtn }) {
	const [host, setHost] = useState("")
	const [clientId, setClientId] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [port, setPort] = useState(0)

	const handleSubmitToConnect = (e) => {
		e.preventDefault()

		const url = `wss://${host}:${port}/mqtt`
		const options = {
			keepalive: 30,
			clean: true,
			useTLS: true,
			protocolVersion: 4,
			reconnectPeriod: 1000,
			connectTimeout: 30 * 1000,
			clientId,
			username,
			password,
			will: {
				topic: "WillMsg",
				payload: "Connection Closed abnormally..!",
				qos: 0,
				retain: false,
			},
			rejectUnauthorized: false,
		}
		console.log({ options })
		connect(url, options)
	}

	const handleDisconnect = (e) => {
		e.preventDefault()
		disconnect()
	}

	const handleHostFieldChange = (event) => {
		event.preventDefault()
		setHost(event.target.value)
	}

	const handleClientIdFieldChange = (event) => {
		event.preventDefault()
		setClientId(event.target.value)
	}

	const handleUsernameFieldChange = (event) => {
		event.preventDefault()
		setUsername(event.target.value)
	}

	const handlePasswordFieldChange = (event) => {
		event.preventDefault()
		setPassword(event.target.value)
	}

	const handlePortFieldChange = (event) => {
		event.preventDefault()
		setPort(event.target.value)
	}

	return (
		<>
			{/* Mobile first / Desktop first */}
			<div className="w-2/3 mx-auto pt-10 pb-10 overflow-hidden">
				<div className="bg-white rounded-md shadow-md">
					<div className="py-4 border-b">
						<h1 className="text-lg font-medium leading-6 text-gray-900 text-center">Connection</h1>
					</div>

					<form onSubmit={handleSubmitToConnect}>
						<div className="px-4 py-5">
							<div className="flex flex-col md:flex md:flex-row w-full">
								<div className="flex-1 p-2">
									<label htmlFor="host" className="block text-sm font-medium text-gray-700">
										Host
									</label>
									<input
										type="text"
										name="host"
										id="host"
										className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block border
                            border-gray-300 rounded-md shadow w-full p-1"
										value={host}
										onChange={(e) => handleHostFieldChange(e)}
									/>
								</div>
								<div className="flex-1 p-2">
									<label htmlFor="clientID" className="block text-sm font-medium text-gray-700">
										Client ID
									</label>
									<input
										type="text"
										name="clientID"
										id="clientID"
										className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block border
                            border-gray-300 rounded-md shadow w-full p-1"
										value={clientId}
										onChange={(e) => handleClientIdFieldChange(e)}
									/>
								</div>
							</div>

							<div className="flex flex-col w-full md:flex md:flex-row">
								<div className="flex-1 p-2">
									<label htmlFor="username" className="block text-sm font-medium text-gray-700">
										Username
									</label>
									<input
										type="text"
										name="username"
										id="username"
										className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block border
                            border-gray-300 rounded-md shadow w-full p-1"
										value={username}
										onChange={(e) => handleUsernameFieldChange(e)}
									/>
								</div>
								<div className="flex-1 p-2">
									<label htmlFor="password" className="block text-sm font-medium text-gray-700">
										Password
									</label>
									<div>
										<input
											type="password"
											name="password"
											id="password"
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block border
                            border-gray-300 rounded-md shadow w-full p-1"
											value={password}
											onChange={(e) => handlePasswordFieldChange(e)}
										/>
									</div>
								</div>
							</div>

							<div className="w-full md:w-1/4 p-2">
								<label htmlFor="port" className="block text-sm font-medium text-gray-700">
									Port
								</label>
								<div>
									<input
										type="number"
										name="port"
										id="port"
										className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block border
                            border-gray-300 rounded-md shadow w-full p-1"
										value={port}
										onChange={(e) => handlePortFieldChange(e)}
									/>
								</div>
							</div>
						</div>

						<div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-md">
							<button
								type="submit"
								className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								{connectBtn}
							</button>

							<button
								className="inline-flex ml-2 justify-center py-2 px-4 border border-red-500 hover:border-red-600 shadow-sm text-sm font-medium rounded-md text-red-500 hover:text-red-600 bg-transparent transition"
								onClick={handleDisconnect}>
								Disconnect
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
