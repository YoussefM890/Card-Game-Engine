const _rules =
  {
    "rules": [
      {
        "triggers": [
          {
            "id": 2,
            "parameters": [
              {
                "id": 3,
                "value": "1"
              }
            ]
          }
        ],
        "actions": [
          {
            "id": 2,
            "parameters": [
              {
                "id": 3,
                "value": "0"
              },
              {
                "id": 4,
                "value": "12"
              }
            ]
          }
        ],
        "rules": [
          {
            "triggers": [
              {
                "id": 2,
                "parameters": [
                  {
                    "id": 4,
                    "value": "2"
                  }
                ]
              }
            ],
            "rules": [],
            "actions": [
              {
                "id": 2,
                "parameters": [
                  {
                    "id": 3,
                    "value": "0"
                  },
                  {
                    "id": 4,
                    "value": "83"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
export const rules = JSON.stringify(_rules, null, 2);
