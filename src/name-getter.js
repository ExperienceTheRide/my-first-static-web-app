import { publish, subscribe } from "@experiencetheride/local-message-router";

let name = ''

subscribe('call', () => {
    publish({ route: 'response', greeting: `Hello, ${name}`})
})

export const initialize =  (given) => {
    name = given
}