import autocannon from 'autocannon'
autocannon(
  {
    url: 'https://vts-stg-h5.kyslb.com/ecs-app-h5/',
    method: 'GET', // 你接口的methods get / post
    connections: 200, // 连接数
    pipelining: 1, // 流水线数量
    duration: 10, // 持续时间
  },
  console.log
)

//npx autocannon -c 2000 -d 10 -p 1 https://vts-stg-h5.kyslb.com/ecs-app-h5/
