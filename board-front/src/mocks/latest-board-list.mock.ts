import { BoardListItem } from "types/interface";

const top3BoardListMock: BoardListItem[] = [
    // API 명세서에 예시 있음
    {
        "boardNumber": 1,
        "title": "오늘 점심 뭐먹지 맛있는 거 먹고 싶은데 추천 부탁 오늘 점심 뭐먹지 맛있는 거 먹고 싶은데",
        "content": "오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 오늘 점심을 뭐먹을 지 너무 고민이 되는 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 ...",
        "boardTitleImage": "data:image/jpeg;base64,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",
        "favoriteCount": 0,
        "commentCount": 0,
        "viewCount": 0,
        "writeDatetime": "2023.08.18. 00:54:27",
        "writerNickname": "안녕하세요나는주코야키",
        "writerProfileImage": "data:image/png;base64,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"
    },
    {
        "boardNumber": 2,
        "title": "오늘 점심 뭐먹지 맛있는 거 먹고 싶은데 추천 부탁 오늘 점심 뭐먹지 맛있는 거 먹고 싶은데",
        "content": "오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 오늘 점심을 뭐먹을 지 너무 고민이 되는 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 ...",
        "boardTitleImage": null,
        "favoriteCount": 0,
        "commentCount": 0,
        "viewCount": 0,
        "writeDatetime": "2023.08.18. 00:54:27",
        "writerNickname": "안녕하세요나는주코야키",
        "writerProfileImage": null
    },
    {
        "boardNumber": 3,
        "title": "오늘 점심 뭐먹지 맛있는 거 먹고 싶은데 추천 부탁 오늘 점심 뭐먹지 맛있는 거 먹고 싶은데",
        "content": "오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 오늘 점심을 뭐먹을 지 너무 고민이 되는 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 ...",
        "boardTitleImage": null,
        "favoriteCount": 0,
        "commentCount": 0,
        "viewCount": 0,
        "writeDatetime": "2023.08.18. 00:54:27",
        "writerNickname": "안녕하세요나는주코야키",
        "writerProfileImage": null
    },
    {
        "boardNumber": 4,
        "title": "오늘 점심 뭐먹지 맛있는 거 먹고 싶은데 추천 부탁 오늘 점심 뭐먹지 맛있는 거 먹고 싶은데",
        "content": "오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 오늘 점심을 뭐먹을 지 너무 고민이 되는 오늘 점심을 뭐먹을 지 너무 고민이 되는 데 뭐 먹을까? 나 점심때 ...",
        "boardTitleImage": null,
        "favoriteCount": 0,
        "commentCount": 0,
        "viewCount": 0,
        "writeDatetime": "2023.08.18. 00:54:27",
        "writerNickname": "안녕하세요나는주코야키",
        "writerProfileImage": null
    }
];

export default top3BoardListMock;