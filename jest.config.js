const esModules = [
    '@experiencetheride/local-message-router',
    '@experiencetheride/js-message-builder',
    '@experiencetheride/js-message-types',
    '@experiencetheride/signalr-interface'
].join('|');

export default {
    roots: [
        "src/"
    ],
    testEnvironment: "jsdom",
    extensionsToTreatAsEsm: [
        ".jsx"
    ],
    transform: {
        "\\.js$": "babel-jest",
        "\\.mjs$": "babel-jest",
        "\\.jsx$": "babel-jest"
    },
    moduleFileExtensions: [
        "js",
        "jsx"
    ],
    moduleDirectories: [
        "node_modules"
    ],
    transformIgnorePatterns: [
        `/node_modules/(?!${esModules})`
    ],
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/src/assets/css/css.mock.js",
    },
    setupFiles: [
        '<rootDir>/jest.setup.js'
    ]
}