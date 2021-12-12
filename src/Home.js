import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Swal from 'sweetalert2'
import Loading from 'components/Loading'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import GithubIcon from '@mui/icons-material/GitHub'
import classNames from 'classnames'

function Home() {
  const [id, setId] = useState('')
  const [idError, setIdError] = useState(false)
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState(false)
  const [result, setResult] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [studentName, setStudentName] = useState('')
  const averageScore =
    result?.map((e) => e.score).reduce((a, b) => a + b, 0) / result?.length
  const apiUrl = process.env.REACT_APP_API_URL
  const handleClick = () => {
    if (id && code && !isLoading) {
      setIdError(false)
      setCodeError(false)
      setIsLoading(true)
      fetch(`${apiUrl}?id=${id}&code=${code}`)
        .then((res) => res.json())
        .then((responseJson) => {
          if (responseJson.success) {
            console.log(responseJson.result)
            setResult(responseJson.result)
            setStudentName(responseJson.name)
          } else {
            Swal.fire({
              icon: 'error',
              title: '錯誤',
              text: '學號或查詢碼錯誤',
              confirmButtonColor: '#1667C2',
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      if (!id) {
        setIdError(true)
      }
      if (!code) {
        setCodeError(true)
      }
    }
  }
  return (
    <div className="h-screen flex flex-col justify-between">
      <Loading isShow={isLoading} />
      <div>
        <Paper elevation={2} className="mx-4 my-10">
          <div className="ml-4 py-5 text-2xl">
            1101計算機程式設計實習 - 成績查詢
          </div>
          <div className="flex flex-col items-center px-4">
            <TextField
              id="id"
              label="學號"
              variant="outlined"
              value={id}
              onChange={(e) => setId(e.target.value)}
              margin="normal"
              error={idError}
              fullWidth
              required
            />
            <TextField
              id="code"
              label="查詢碼"
              variant="outlined"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              margin="normal"
              error={codeError}
              fullWidth
              required
            />
            <div className="my-5 w-full">
              <Button variant="contained" fullWidth onClick={handleClick}>
                送出
              </Button>
            </div>
          </div>
        </Paper>
        {result.length > 0 && studentName && (
          <div className="mx-4">
            <Paper elevation={2} className="my-10" sx={{ minWidth: '100%' }}>
              <div className="p-4">
                <div className="text-3xl mb-4">結果</div>
                <div className="text-xl mb-4">{studentName}</div>
                <TableContainer component={Paper} sx={{ minWidth: '100%' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ minWidth: 85 }}>Lab回數</TableCell>
                        <TableCell sx={{ minWidth: 65 }}>成績</TableCell>
                        <TableCell sx={{ minWidth: 90 }}>出席狀況</TableCell>
                        <TableCell sx={{ minWidth: 450 }}>繳交狀況</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {result.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.title}</TableCell>
                          <TableCell key={`score_${index}`}>
                            <div
                              className={classNames({
                                'text-red-500': item.score < 60,
                              })}
                            >
                              {item.score}
                            </div>
                          </TableCell>
                          <TableCell>{item.attend}</TableCell>
                          <TableCell key={`attend_${index}`}>
                            <div className="flex">
                              {item.handIn.map((status, statusIndex) => (
                                <>
                                  <div
                                    className={classNames({
                                      'text-green-600': status === '準時',
                                      'text-yellow-500': status === '補交',
                                      'text-red-500': status === '未交',
                                    })}
                                  >
                                    {status}
                                  </div>
                                  {statusIndex !== item.handIn.length - 1 && (
                                    <div className="mx-2">|</div>
                                  )}
                                </>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div
                  className={classNames('text-xl mt-4', {
                    'text-red-500': averageScore < 60,
                  })}
                >
                  平均: {averageScore.toFixed(2)}
                </div>
              </div>
            </Paper>
          </div>
        )}
      </div>
      <a
        href="https://github.com/narihira2000/Computer-Programming-Score-Inquery"
        target="_blank"
        rel="noreferrer"
        className="flex self-center justify-center pb-4"
      >
        <GithubIcon />
      </a>
    </div>
  )
}

export default Home
