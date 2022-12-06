import React from "react";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import NavBar from "../NavBar/NavBar";
import "./grade.css";
export default function Grade() {
  return (
    <div>
      <NavBar />
      <div className="grade">
        <Sidebar />
        <div className="annouce" style={{ marginTop: "30px" }}>
          <span>
            <i className="bx bxs-notepad" />
            BẢNG ĐIỂM
          </span>
        </div>
        <div
          className="grade-table"
          style={{ padding: "30px", fontSize: "15px" }}
        >
          <table class="table table-bordered table-hover p-5">
            <thead>
              <tr>
                <th>Môn học</th>
                <th>Điểm miệng</th>
                <th>Điểm 15 phút</th>
                <th>Điểm 1 tiết</th>
                <th>Học Kỳ</th>
                <th>TBM</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Toán Học</th>
                <td>8</td>
                <td>4</td>
                <td>2</td>
                <td>1</td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Vật lí</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Hóa Học</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Sinh Học</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Tin Học</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Ngữ Văn</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Lịch Sử</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Địa Lí</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Ngoại Ngữ</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">GDCD</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Công nghệ</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Thể dục</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">GDQP</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          
        </div>
      </div>
    </div>
  );
}
