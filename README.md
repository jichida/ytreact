# ytreact
7853188Zona
npm install http-headers --save
https://github.com/watson/http-headers
httpHeaders(data[, onlyHeaders])
Arguments:

data - A string, buffer or instance of http.ServerReponse

Request example
If given a request as input:

GET /foo HTTP/1.1
Date: Tue, 10 Jun 2014 07:19:27 GMT
Connection: keep-alive
Transfer-Encoding: chunked

Hello World
Returns:

{
  method: 'GET',
  url: '/foo',
  version: { major: 1, minor: 1 },
  headers: {
    date: 'Tue, 10 Jun 2014 07:19:27 GMT',
    connection: 'keep-alive',
    'transfer-encoding': 'chunked'
  }
}
