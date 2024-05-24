import { useState } from "react";
import "./App.css";

function App() {
  const [fileContent, setFileContent] = useState();

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (event) => {
      const fileText = event.target.result;
      const lines = fileText.split("\n");
      const ipList = lines.map((line) => line.split(" - - "));
      const ipList2 = ipList.map((item) => {
        return {
          id: item[0],
          info: item[1],
        };
      });

      const result = Object.groupBy(ipList2, ({ id }) => id);
      const ipArr = Object.entries(result);
      setFileContent(ipArr);
    };
  };

  return (
    <>
      <div className="container">
        <div className="heading">
          <h1>File Reader</h1>
          <div>
            <input
              type="file"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
        </div>
        <h2 className="mb-5">
          Thống kê có : {fileContent != undefined ? fileContent.length : 0} IP
        </h2>
        {fileContent &&
          fileContent.map((item, ix) => {
            return (
              <>
                <div key={ix} className="mb-5">
                  <h3>IP: {item[0]}</h3>
                  <p>Số lượng: {item[1].length}</p>
                  <table id={"accordion" + ix}>
                    <thead>
                      <tr id={"headingOne" + ix}>
                        <th
                          data-toggle="collapse"
                          data-target={"#One" + ix}
                          aria-expanded="true"
                          aria-controls={"One" + ix}
                        >
                          Info
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      id={"One" + ix}
                      className="collapse"
                      aria-labelledby={"headingOne" + ix}
                      data-parent={"accordion" + ix}
                    >
                      {item[1].map((i, index) => {
                        const infoString = i.info?.toString();
                        const infoArray = infoString?.split('"');
                        return (
                          <tr key={index}>
                            <td>
                              {infoArray?.map((a, i) => (
                                <p key={i}>{a}</p>
                              ))}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default App;
