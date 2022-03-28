import React from 'react'
import { TableBody, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom"
import { useMediaQuery } from 'react-responsive';

function Content({ list }) {
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  return (
    <>
      {isMobile ? (
        <>
          <TableBody>
            {list.map((item, index) =>
              <Link to={`/notice/${item.id}`}>
                <TableRow key={index}>
                  <TableCell style={{ width: "10%", textAlign: 'center' }}>{item.id}</TableCell>
                  <TableCell style={{  width: "40%",textAlign: 'center' }}>{item.title}</TableCell>
                  <TableCell style={{  width: "10%",textAlign: 'center' }}>{item.views}</TableCell>
                  <TableCell style={{  width: "10%",textAlign: 'center' }}>{item.writer}</TableCell>
                  <TableCell style={{  width: "10%",textAlign: 'center' }}>{item.created}</TableCell>
                </TableRow>
              </Link>)
            }
          </TableBody>
        </>) : (
          <>
            <TableBody>
              {list.map((item, index) =>
                <TableRow key={index}>
                  <TableCell style={{ textAlign: 'center' }}>{item.id}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{item.title}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{item.views}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{item.writer}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{item.created}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}><Link to={`/notice/${item.id}`}>상세보기</Link></TableCell>
                </TableRow>)
              }
            </TableBody>
          </>)}
    </>
  )
}

export default Content
