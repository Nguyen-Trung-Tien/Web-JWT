import defineConfig from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        console: "readonly", // cho phép console
        require: "readonly", // cho phép require
        module: "readonly", // cho phép module.exports
        __dirname: "readonly",
      },
      sourceType: "commonjs", // để không bị báo require
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off", // tắt báo undefined
      "no-console": "off", // tắt báo console.log
    },
  },
]);
