import { publish, subscribe } from "@experiencetheride/local-message-router";

subscribe('call', () => {
    publish({ route: 'response', greeting: 'Hello, Mark'})
})