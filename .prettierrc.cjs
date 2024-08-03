// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

const config = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  bracketSameLine: true,
  printWidth: 100,
  overrides: [
    {
      files: ".prettierrc",
      options: { parser: "json" },
    },
    // {
    //   files: "*.js",
    //   options: {
    //     parser: "flow",
    //   },
    // },
  ],
};

module.exports = config;
