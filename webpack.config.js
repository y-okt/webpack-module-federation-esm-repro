const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");
const path = require("path");

module.exports = [
  // plain
  {
    entry: "./src/entry-plain.js",
    output: {
      path: path.resolve(__dirname, "dist/plain"),
      publicPath: "/dist/plain/",
    },
  },
  // federation-remote
  {
    entry: "./src/entry-federation-remote.js",
    output: {
      path: path.resolve(__dirname, "dist/federation-remote"),
      publicPath: "/dist/federation-remote/",
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "federationRemote",
        remotes: {
          "remote-example": "remoteExample@/dist/remote-example/remoteEntry.js",
        },
        shared: {
          "test-pkg-123": { singleton: true, import: false, requiredVersion: "0.0.0" },
        },
      }),
    ],
  },
  {
    entry: "./src/remote-example.js",
    output: {
      path: path.resolve(__dirname, "dist/remote-example"),
      publicPath: "/dist/remote-example/",
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "remoteExample",
        filename: "remoteEntry.js",
        exposes: {
          ".": "./src/remote-example.js",
        },
        shared: {
          "test-pkg-123": { singleton: true, requiredVersion: "0.0.0" },
        },
      }),
    ],
  },
  // federation-local
  {
    entry: "./src/entry-federation-local.js",
    output: {
      path: path.resolve(__dirname, "dist/federation-local"),
      publicPath: "/dist/federation-local/",
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "federationLocal",
        shared: {
          "test-pkg-123": { singleton: true, requiredVersion: "0.0.0" },
        },
      }),
    ],
  },
];
