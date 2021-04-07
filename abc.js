const axios = require("axios");
const request = require("request");
const logResponseBody = (req, res, next) => {
//   function updateClient(postData) {
//     var clientServerOptions = {
//       uri: "http://localhost:4000/call_to_server",
//       body: JSON.stringify(postData),
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     request(clientServerOptions, function (error, response) {
//       console.log(error, response.body);
//       return;
//     });
//   }
//   updateClient(req)
  axios
    .post("http://localhost:4000/call_to_server", {
      url: req.url,
      hostname: req.hostname,
      protocol: req.protocol,
      method: req.method,
    })

    .catch(console.error);
  var oldWrite = res.write,
    oldEnd = res.end;

  var chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);

    return oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) chunks.push(chunk);

    var body = Buffer.concat(chunks).toString("utf8");
    axios
      .post("http://localhost:4000/call_to_server_on_finish", {
        body: body,
      })

      .catch(console.error);
    oldEnd.apply(res, arguments);
  };
  next();
};
module.exports = logResponseBody;
