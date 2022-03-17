import React from 'react'
import { TableBody, TableCell, TableRow } from "@mui/material";


function Content({ keyword }) {
  const content = [
    {
      "id": 1,
      "title": "apple",
      "views": 1,
      "writer": "hjs",
      "created": "2020.02.02"
    },
    {
      "id": 2,
      "title": "bcddd",
      "views": 1,
      "writer": "hjs",
      "created": "2020.02.02"
    },
    {
      "id": 3,
      "title": "xyzza",
      "views": 1,
      "writer": "hjs",
      "created": "2020.02.02"
    },
    {
      "id": 4,
      "title": "한글도 되려나",
      "views": 1,
      "writer": "hjs",
      "created": "2020.02.02"
    }
  ]

  //  props 받은 keyword 를 filter를 통해 해당 keyword를 포함하고 있는 content 들을 return 하는 함수
  const filter = (keyword) => {
    if (keyword !== "") {
      return content.filter((item) => item.title.includes(keyword))
    } else {
      return content.map((item) => item)
    }
  }

  return (
    <>
      {filter(keyword).map((item, index) => 
        <TableBody key={index}>
          <TableRow>
            <TableCell style={{ textAlign: 'center' }}>{item.id}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{item.title}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{item.views}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{item.writer}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{item.created}</TableCell>
          </TableRow>
        </TableBody>)
      }
    </>
  )
}

export default Content
