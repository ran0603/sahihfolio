const baseConfig = require("./base");

module.exports = [
  ...baseConfig,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];
