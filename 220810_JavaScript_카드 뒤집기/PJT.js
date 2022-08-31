const cardArray = [
  {
    name: "cat",
    img: "./public/cat.jpg",
    id: null,
    done: false,
  },
  {
    name: "cat",
    img: "./public/cat.jpg",
    id: null,
    done: false,
  },
  {
    name: "dog",
    img: "./public/dog.jpg",
    id: null,
    done: false,
  },
  {
    name: "dog",
    img: "./public/dog.jpg",
    id: null,
    done: false,
  },
  {
    name: "hamster",
    img: "./public/hamster.jpg",
    id: null,
    done: false,
  },
  {
    name: "hamster",
    img: "./public/hamster.jpg",
    id: null,
    done: false,
  },
  {
    name: "pig",
    img: "./public/pig.jpg",
    id: null,
    done: false,
  },
  {
    name: "pig",
    img: "./public/pig.jpg",
    id: null,
    done: false,
  },
  {
    name: "rabbit",
    img: "./public/rabbit.jpg",
    id: null,
    done: false,
  },
  {
    name: "rabbit",
    img: "./public/rabbit.jpg",
    id: null,
    done: false,
  },
  {
    name: "tiger",
    img: "./public/tiger.jpg",
    id: null,
    done: false,
  },
  {
    name: "tiger",
    img: "./public/tiger.jpg",
    id: null,
    done: false,
  },
];

// 파싱한 DOM 정보를 gameDOM 빈 배열에 넣는다.(querySelectorAll)
const gameDOM = [];

// DOM 정보를 작업하기 쉽게 미리 파싱(DOM 정볼보를 싹 다 가져온다.)
const getGameDOM = () => {
  const rows = document.querySelectorAll(".row");
  for (let i = 0; i < rows.length; i++) {
    gameDOM[i] = rows[i].querySelectorAll(".column");
  }
};

// cardArray에 DOM 위치에 맞는 id 부여
const setIDtoCardArray = () => {
  cardArray[0].id = "0-0";
  cardArray[1].id = "0-1";
  cardArray[2].id = "0-2";
  cardArray[3].id = "0-3";
  cardArray[4].id = "1-0";
  cardArray[5].id = "1-1";
  cardArray[6].id = "1-2";
  cardArray[7].id = "1-3";
  cardArray[8].id = "2-0";
  cardArray[9].id = "2-1";
  cardArray[10].id = "2-2";
  cardArray[11].id = "2-3";
};

let clickFirst = -1;
let clickSecond = -1;
let clickCount = 0;

// gameDOM 각 칸에 물음표 생성
const createBoard = () => {
  for (let i = 0; i < gameDOM.length; i++) {
    for (let j = 0; j < gameDOM[i].length; j++) {
      const card = document.createElement("img");
      card.setAttribute("src", "./public/question-mark.jpg");
      gameDOM[i][j].appendChild(card);
    }
  }
};

// 첫번째 클릭인지 두번째 클릭인지 판단
const setClickHistory = (location) => {
  if (clickFirst === -1) {
    clickFirst = location;
  } else {
    clickSecond = location;
  }
};

// 틀렸을 경우, 다시 뒤집는다.(0.5초 딜레이)
const backFlip = () => {
  const parsedIdFirst = cardArray[clickFirst].id.split("-");
  const parsedIdSecond = cardArray[clickSecond].id.split("-");
  setTimeout(() => {
    gameDOM[parsedIdFirst[0]][parsedIdFirst[1]].querySelector("img").src =
      "./public/question-mark.jpg";
    gameDOM[parsedIdSecond[0]][parsedIdSecond[1]].querySelector("img").src =
      "./public/question-mark.jpg";
  }, 500);
};

// 두 카드가 동일한 카드인지 확인
const isCorrect = () => {
  if (cardArray[clickFirst].name === cardArray[clickSecond].name) {
    cardArray[clickFirst].done = true;
    cardArray[clickSecond].done = true;
  } else {
    backFlip();
  }
};

// 카드 뒤집기
const flip = (location) => {
  // 카드가 뒤집힌 상태(done: false)에서만 클릭 가능
  if (!cardArray[location].done) {
    setClickHistory(location);

    const parsedId = cardArray[location].id.split("-");
    gameDOM[parsedId[0]][parsedId[1]].querySelector("img").src =
      cardArray[location].img;

    clickCount++;
    if (clickCount === 2) {
      clickCount = 0;
      isCorrect();
    }

    // 두 번 눌렸을 때, 다시 초기화
    if (clickFirst !== -1 && clickSecond !== -1) {
      clickFirst = -1;
      clickSecond = -1;
    }
  }
};

getGameDOM();

// cardArray 배열을 섞어버림
cardArray.sort(() => 0.5 - Math.random());

setIDtoCardArray();
createBoard();
