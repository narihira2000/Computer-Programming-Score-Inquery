# Computer Programming Score Inquery
## 一個從 Google 試算表撈成績資料以供人查詢的網頁

## 說明
- 後端使用 Google App Script 的 `doGet` 方法抓取試算表資料並回傳
- 前端再將其排版
- 使用 React 寫成
- 後端回傳資料格式
``` json
{
    "success": true,
    "name": "M11012345@ 王小明",
    "result": [
        {
            "handIn": ["準時", "補交", "補交", "未交"],
            "title": "Lab1",
            "score": 80,
            "attend": "遲",
        }
    ]
}
```

## Screenshots
![](https://i.imgur.com/KFxQg9D.png)
