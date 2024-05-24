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
        {fileContent && fileContent.map((item, ix) => {
          return (
            <>
              <div key={ix}>
                <hr />
                <h3>IP: {item[0]}</h3>
                <p>Số lượng: {item[1].length}</p>
                <table>
                  <tr>
                    <th>Info</th>
                  </tr>

                  {item[1].map((i, index) => {
                    const infoString = i.info?.toString();
                    const infoArray = infoString?.split('"')
                    return (
                      <tr key={index}>
                        <td>{infoArray?.map((a, i) => (<p key={i}>{a}</p>))}</td>
                      </tr>
                    )
                  })}
                </table>

                <hr />
              </div>
            </>
          )
        })}

      </div>
    </>
  )
}

export default App
