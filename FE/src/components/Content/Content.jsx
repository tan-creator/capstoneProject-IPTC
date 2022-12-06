import React, { useEffect, useState } from "react";
import { getNotification } from "./../../helpers/getUser";
export default function Content() {
  const notis = getNotification();

  return (
    <div className="forum-content">
      <div className="content-right">
        <div className="anounce box">
          <div className="pb10">
            <i className="bx bxs-notepad" />
            <span>Thông báo</span>
          </div>
          <div>
            <a href="#">
              <i className="bx bxs-circle" />
              Lịch thi học kỳ I 2022 - 2023
            </a>
          </div>
          <div>
            <a href="#">
              <i className="bx bxs-circle" />
              Lịch họp phụ huynh học kỳ I 2022 - 2023
            </a>
          </div>
          {/*  */}

          <div className="pt10 pb10">
            <i className="bx bxs-help-circle" />
            <span>Trợ giúp</span>
          </div>
          <div>
            <a href="#">
              <i className="bx bxs-circle" />
              Cần giúp đỡ?
            </a>
          </div>
          <div>
            <a href="#">
              <i className="bx bxs-circle" />
              Tư vấn tuyển sinh
            </a>
          </div>
          <div>
            <a href="#">
              <i className="bx bxs-circle" />
              Thông tin về nhà trường
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
