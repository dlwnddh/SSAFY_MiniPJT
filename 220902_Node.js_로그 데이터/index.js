const express = require("express");

const app = express();
const PORT = 8080;

const cors = require("cors");
app.use(cors());

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.json());

const { logger } = require("./utils/winston");

app.use(express.static(__dirname + "/views"));

const fs = require("fs");

// insert 함수 생성
const insert = (str, index, tar) => {
  const a = str.slice(0, index);
  const b = str.slice(index, str.length);
  return a + tar + b;
};

let ret = {};

app.post("/api/logs", async (req, res) => {
  logger.error("error 메시지");
  logger.warn("warn 메시지");
  logger.info("info 메시지");
  logger.http("http 메시지");
  logger.debug("debug 메시지");

  // ./logs/2022-09-02-12.log 부분은 시간, 날짜가 바뀔때마다 직접 바꿔줘야한다.
  fs.readFile("./logs/2022-09-02-14.log", "utf8", (err, data) => {
    ret = data;
    let idx = -1;

    while (1) {
      idx = ret.indexOf("}", idx + 1);

      if (idx === -1) break;

      ret = insert(ret, idx + 1, ",");
    }

    // 객체 형태로 바꿔주기
    ret = "[" + ret.slice(0, ret.length - 3) + "]";
    // JSON 형태로 바꿔주기
    ret = JSON.parse(ret);
    console.log(ret);
  });

  return res.json({
    test: "OK",
  });
});

app.get("/api/logs", async (req, res) => {
  res.json(ret);
});

app.listen(PORT, () => console.log(`this server listening on ${PORT}`));
