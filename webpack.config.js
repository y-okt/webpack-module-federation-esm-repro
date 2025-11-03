const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = [
  // plain
  {
    entry: "./src/entry-plain.js",
    output: {
      path: path.resolve(__dirname, "dist/plain"),
    },
  },
  // federation-remote
  {
    entry: "./src/entry-federation-remote.js",
    output: {
      path: path.resolve(__dirname, "dist/federation-remote"),
    },
    plugins: [
      new ModuleFederationPlugin({
        remotes: {
          "remote-example": "remoteExample@/dist/remote-example/remoteEntry.js",
        },
        shared: {
          "test-pkg-123": { singleton: true, import: false },
        },
      }),
    ],
  },
  {
    entry: "./src/remote-example.js",
    output: {
      path: path.resolve(__dirname, "dist/remote-example"),
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "remoteExample",
        filename: "remoteEntry.js",
        exposes: {
          ".": "./src/remote-example.js",
        },
        shared: {
          "test-pkg-123": { singleton: true },
        },
      }),
    ],
  },
  // federation-local
  {
    entry: "./src/entry-federation-local.js",
    output: {
      path: path.resolve(__dirname, "dist/federation-local"),
    },
    plugins: [
      new ModuleFederationPlugin({
        shared: {
          "test-pkg-123": { singleton: true },
        },
      }),
    ],
  },
];
