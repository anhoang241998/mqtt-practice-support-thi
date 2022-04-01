import React, { useState, useEffect } from "react"
import mqtt from "mqtt/dist/mqtt"
import Connection from "./Connection"
import Subscriber from "./Subscriber"

export default function HookMqtt() {
	const [client, setClient] = useState(null)
	const [isSub, setIsSub] = useState(false)
	const [payload, setPayload] = useState({})
	const [connectionStatus, setConnectionStatus] = useState("Connect")

	/**
	 *
	 * @param {String} host mqtt broker url
	 * @param {IClientOptions} mqttOptions connection options
	 */
	const mqttConnect = (host, mqttOptions) => {
		setConnectionStatus("Connecting")
		const client = mqtt.connect(host, mqttOptions)
		setClient(client)
	}

	useEffect(() => {
		if (client == null) return

		client.on("connect", () => {
			setConnectionStatus("Connected")
		})

		client.on("error", (error) => {
			setConnectionStatus("Error")
			console.error(`Connection error: ${error}`)
			client.end()
		})

		client.on("reconnect", () => {
			setConnectionStatus("Reconnecting")
		})

		client.on("message", (topic, message) => {
			const payload = {
				topic: topic,
				message: message.toString(),
			}
			console.log(`data received: ${payload.message}`)
			setPayload(payload)
		})
	}, [client])

	const mqttDisconnect = () => {
		if (client == null) return

		client.end(() => {
			setConnectionStatus("Connect")
		})
	}

	const mqttPublish = (context) => {
		if (client == null) return

		const { topic, qos, payload } = context
		client.publish(topic, payload, { qos }, (error) => {
			if (error == null) return
			console.log(`Publish error: ${error}`)
		})
	}

	const mqttSub = (subscription) => {
		if (client == null) return
		const { topic, qos } = subscription

		client.subscribe(topic, { qos }, (error) => {
			if (error == null) return
			console.log(`Subscribe to topics error ${error}`)
		})
		setIsSub(true)
	}

	const mqttUnSub = (subscription) => {
		if (client == null) return
		const { topic } = subscription

		client.unsubscribe(topic, (error) => {
			if (error == null) return
			console.log(`Subscribe to topics error ${error}`)
		})
		setIsSub(false)
	}

	return (
		<>
			<div className="min-h-screen bg-gray-100">
				<Connection
					connect={mqttConnect}
					disconnect={mqttDisconnect}
					connectBtn={connectionStatus}
				/>
				<Subscriber sub={mqttSub} showUnSub={isSub} unSub={mqttUnSub} />
			</div>
		</>
	)
}
