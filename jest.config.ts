import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./",
});

const config: Config = {
    watchman: false,
    coverageProvider: "v8",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
        "^@/lib/cameras/get-cameras$": "<rootDir>/lib/cameras/__mocks__/get-cameras.ts",
    },

    // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
