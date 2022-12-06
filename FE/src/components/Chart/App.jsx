import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

function App() {
  const nameSubject = ["Môn toán", "Môn Ngữ Văn", "Môn Anh Văn"];
  const UserData = [
    {
      id: 1,
      name: "Khang",
      grade_Toan: 6,
      grade_Van: 7,
      grade_Anh: 8,
      userGrade: 7,
      userLost: 823,
    },
    {
      id: 2,
      name: "Nam",
      grade_Toan: 10,
      grade_Van: 5,
      grade_Anh: 8,
      grade: 1,
      userGrade: 2,
      userLost: 345,
    },
    {
      id: 3,
      name: "Tuan",
      grade_Toan: 7,
      grade_Van: 9,
      grade_Anh: 8,
      grade: 2,
      userGrade: 5,
      userLost: 555,
    },
    {
      id: 4,
      name: "Hung",
      grade_Toan: 3,
      grade_Van: 7,
      grade_Anh: 5,
      grade: 3,
      userGrade: 9,
      userLost: 4555,
    },
    {
      id: 5,
      name: "Huy",
      grade_Toan: 9,
      grade_Van: 4,
      grade_Anh: 6,
      grade: 4,
      userGrade: 8,
      userLost: 234,
    },
    {
      id: 6,
      name: "Tan",
      grade_Toan: 6,
      grade_Van: 7,
      grade_Anh: 8,
      grade: 4,
      userGrade: 6,
      userLost: 234,
    },
    {
      id: 7,
      name: "Truong",
      grade_Toan: 2,
      grade_Van: 10,
      grade_Anh: 8,
      grade: 4,
      userGrade: 8,
      userLost: 234,
    },
    {
      id: 8,
      name: "Loc",
      grade_Toan: 3,
      grade_Van: 4,
      grade_Anh: 6,
      grade: 4,
      userGrade: 10,
      userLost: 234,
    },
    {
      id: 9,
      name: "Hue",
      grade_Toan: 7,
      grade_Van: 7,
      grade_Anh: 8,
      grade: 4,
      userGrade: 2,
      userLost: 234,
    },
    {
      id: 10,
      name: "Tai",
      grade_Toan: 2,
      grade_Van: 9,
      grade_Anh: 7,
      grade: 4,
      userGrade: 7,
      userLost: 234,
    },
  ];

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.name),
    datasets: [
      {
        label: "Môn Toán",
        data: UserData.map((data) => data.grade_Toan),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });
  return (
    <div className="App">
      <NavBar />
      <Sidebar />
      <div style={{ width: 200, marginTop: 200, marginLeft: 260 }}>
        <select name="" id="input" className="form-control" required="required">
          <option value="Toan">Toán</option>
          <option value="Van">Văn</option>
          <option value="Anh">Anh</option>
        </select>
      </div>
      <div style={{ width: 700, marginLeft: 260 }}>
        <BarChart chartData={userData} />
      </div>
      <div style={{ width: 700, marginLeft: 260 }}>
        <LineChart chartData={userData} />
      </div>
    </div>
  );
}

export default App;
