const express = require("express");

const app = express();
const PORT = 8081;

const cors = require("cors");
app.use(cors());

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.json());

const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

app.get("/", (req, res) => {
  return res.json({
    status: true,
  });
});

app.get("/data", async (req, res) => {
  try {
    res.set("Content-Type", "application/json; charset=utf-8");
    const tempFile = fs.createReadStream("uploads/chart.json");
    return tempFile.pipe(res);
  } catch (error) {
    return res.json(error);
  }
});

app.post("/data", async (req, res) => {
  const { startDate, endDate, timeUnit, device, gender, keywordGroups } =
    req.body;
  try {
    const request_body = {
      startDate: startDate,
      endDate: endDate,
      timeUnit: timeUnit,
      device: device === "all" ? "" : device,
      gender: gender === "all" ? "" : gender,
      keywordGroups: keywordGroups,
    };

    const url = "https://openapi.naver.com/v1/datalab/search";
    // header : 서버 코드에 들어갈 설정
    const headers = {
      "Content-Type": "application/json", // JSON 파일로 받길 원한다.
      // 해커의 공격을 막기 위해 직접 입력하지 않고, .env 파일에서 불러온다.
      "X-Naver-Client-Id": process.env.CLIENT_ID,
      "X-Naver-Client-Secret": process.env.CLIENT_SECRET,
    };
    const response = await axios.post(url, request_body, {
      headers: headers,
    });
    // 요청 성공 시, 차트를 그리기 위한 배열 데이터를 JSON 형태로 ./uploads/chart.json에 저장
    fs.writeFile(
      `./uploads/chart.json`, // uploads 폴더에 chart.json 파일 생성
      JSON.stringify(response.data.results), // 받아온 데이터를 JSON 양식으로 변경
      (error) => {
        if (error) {
          throw error;
        }
      }
    );
    return res.json(response.data.results);
  } catch (error) {
    return res.json(error);
  }
});

app.listen(PORT, () => console.log(`this server listening on ${PORT}`));
