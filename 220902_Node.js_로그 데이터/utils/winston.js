const winston = require("winston");
// 필요한 라이브러리 가져오기
// format과 combine 사용
// winston의 format을 가져오기 위함
const { format } = require("winston");
const { combine } = format;

require("winston-daily-rotate-file");

const transport = new winston.transports.DailyRotateFile({
  level: "info",
  filename: "./logs/%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true, // 어느정도 양이 쌓이면 압축
  maxSize: "20m",
  maxFiles: "1d",
  format: combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
});

const logger = winston.createLogger({
  transports: [transport],
});

module.exports = { logger };
