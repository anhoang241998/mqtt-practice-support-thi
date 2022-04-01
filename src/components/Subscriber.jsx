import React, { useState } from "react"

export default function Subscriber({ sub, unSub, showUnSub }) {
	const [topics, setTopics] = useState("")
	const [qos, setQos] = useState(0)

	const subscribeTopics = (e) => {
		e.preventDefault()
		const topic = {
			topic: topics,
			qos: qos,
		}
		sub(topic)
	}

	const unSubscribeTopics = (e) => {
		e.preventDefault()
		const topic = {
			topic: topics,
			qos: qos,
		}
		unSub(topic)
	}

	const handleSetTopicsChange = (e) => {
		e.preventDefault()
		setTopics(e.target.value)
	}

	const handleQosSelected = (e) => {
		e.preventDefault()
		setQos(e.target.value)
	}

	return (
		<>
			<div className="w-2/3 mx-auto pt-10 pb-10 overflow-hidden">
				<div className="bg-white rounded-md shadow-md">
					<div className="py-4 border-b">
						<h1 className="text-lg font-medium leading-6 text-gray-900 text-center">Subscriber</h1>
					</div>

					<form onSubmit={subscribeTopics}>
						<div className="px-4">
							<div className="p-2">
								<label htmlFor="topic" className="block text-sm font-medium text-gray-700">
									Topic
								</label>
								<input
									onChange={(e) => handleSetTopicsChange(e)}
									type="text"
									name="topic"
									id="topic"
									className="mt-1 focus:ring-indigo-500 
                      p-1 focus:border-indigo-500 block border
                            border-gray-300 rounded-md shadow w-full"
								/>
							</div>

							<div className="p-2">
								<label htmlFor="qos" className="block text-sm font-medium text-gray-700">
									Qos
								</label>
								<select
									onChange={(e) => handleQosSelected(e)}
									name="qos"
									id="qos"
									autoComplete="qos"
									className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
									<option>{0}</option>
									<option>{1}</option>
									<option>{2}</option>
								</select>
							</div>
						</div>
						<div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-md">
							<button
								type="submit"
								className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Subscribe
							</button>
							{showUnSub ? (
								<button
									className="inline-flex ml-2 justify-center py-2 px-4 border border-red-500 hover:border-red-600 shadow-sm text-sm font-medium rounded-md text-red-500 hover:text-red-600 bg-transparent transition"
									onClick={unSubscribeTopics}>
									Unsubscribe
								</button>
							) : null}
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
