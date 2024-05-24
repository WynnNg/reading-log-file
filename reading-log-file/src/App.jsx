import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [fileContent, setFileContent] = useState();

  const handleOnChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = event => {
      const fileText = event.target.result
      const lines = fileText.split('\n')
      const ipList = lines.map((line) => line.split(' - - '))
      const ipList2 = ipList.map((item) => {
        return {
          id: item[0],
          info: item[1]
        }
      })

      const result = Object.groupBy(ipList2, ({ id }) => id);
      const ipArr = Object.entries(result)
      console.log("check fileContent", ipArr)
      setFileContent(ipArr)
    }

  }

  return (
    <>
      <div>
        <h1>File Reader</h1>
        <div>
          <input type='file' onChange={(e) => { handleOnChange(e) }} />
        </div>
        <h2>Thống kê</h2>
        {fileContent && fileContent.map((item) => {
          return (
            <>
              <hr />
              <h3>IP: {item[0]}</h3>
              <p>Số lượng: {item[1].length}</p>
              <table>
                <tr>
                  <th>Info</th>
                </tr>

                {item[1].map((i) => {
                  return (
                    <tr>
                      <td>{i.info}</td>
                    </tr>
                  )
                })}
              </table>

              <hr />
            </>
          )
        })}

      </div>
    </>
  )
}

export default App
