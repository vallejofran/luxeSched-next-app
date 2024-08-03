const appEnv = 'dev'

const nodeApiUrl = {
  pro: '',
  test: process.env.NEXT_PUBLIC_NODE_API_URL_TEST,
  dev: process.env.NEXT_PUBLIC_NODE_API_URL_DEV,
}

const Config = Object.freeze({
  appName: 'Luxe Sched App',
  appEnv: appEnv,
  nodeApiUrl: nodeApiUrl[appEnv],
})

export default Config
