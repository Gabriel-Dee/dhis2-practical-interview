const students = [
    {
      "studentName": "John Doe",
      "studentId": "393494",
      "courseResults": {
        "courseWork": [
          { "subject": "Pascal", "score": 34 },
          { "subject": "C Programming", "score": 24 }
        ],
        "ue": [
          { "subject": "Pascal", "score": 56 },
          { "subject": "C Programming", "score": 40 }
        ]
      }
    },
    {
      "studentName": "Jane Robert",
      "studentId": "439493",
      "courseResults": {
        "courseWork": [
          { "subject": "Pascal", "score": 28 },
          { "subject": "C Programming", "score": 24 }
        ],
        "ue": [
          { "subject": "Pascal", "score": 56 },
          { "subject": "C Programming", "score": 50 }
        ]
      }
    }
  ];
  
  const totalScores = students.map(student => {
    const courseWorkTotal = student.courseResults.courseWork.reduce((acc, curr) => acc + curr.score, 0);
    const ueTotal = student.courseResults.ue.reduce((acc, curr) => acc + curr.score, 0);
    const totalScore = courseWorkTotal + ueTotal;
    
    return {
      "studentName": student.studentName,
      "totalScore": totalScore
    };
  });
  
  console.log(totalScores);
  