import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Layout/DefaultLayout/Sidebar/Sidebar";
import "./Dashboard.css";
import { motion } from "framer-motion";
const cardVariants = {
    offscreen: {
        opacity: 0,
        marginTop: -100,
    },
    onscreen: {
        y: 0,
        marginTop: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 3,
        },
    },
};
export default function Dashboard() {
    const [account, setAccount] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("account"));
        setAccount({ ...user });
    }, []);
    return (
        <div>
            <NavBar />
            <div className="dashboard">
                <Sidebar />
                <section className="db-title">
                    <div className="db-container">
                        <div className="db-text">
                            <h1>MẠNG LƯỚI KẾT NỐI GIÁO DỤC</h1>
                            <p className="db-desc">
                                Giáo viên và phụ huynh đều có vai trò quan
                                trọng, không thể thay thế trong quá trình giáo
                                dục con cái. Phụ huynh luôn mong đợi giáo viên
                                sẽ dạy dỗ con em họ ở trường theo một cách hoàn
                                hảo nhất, trong khi đó, giáo viên lại mong đợi
                                phụ huynh hỗ trợ họ trong việc giáo dục con cái
                                ở nhà và ở trường.
                            </p>
                        </div>
                        <div className="db-img">
                            <img
                                src="./img/teacher-parent-meeting.webp"
                                style={{ width: "500px", borderRadius: "5px" }}
                            />
                        </div>
                    </div>
                </section>
                <motion.div
                    className="card-container"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    variants={cardVariants}
                >
                    <section className="category">
                        <p className="cate-feature">TÍNH NĂNG NỔI BẬT</p>
                        <div className="ul category__list">
                            {/* column 1 */}
                            {account?.Role === "Teacher" && (
                                <li className="category__item">
                                    <img
                                        src="./img/img1.png"
                                        style={{ borderRadius: "5px" }}
                                        alt=""
                                        className="category_image"
                                    />
                                    <h3 className="category__name">
                                        Xem lịch dạy
                                    </h3>
                                    <a
                                        href="/schedule"
                                        className="category__details"
                                    >
                                        Xem tại đây
                                    </a>
                                </li>
                            )}
                            {account?.Role === "Parent" && (
                                <li className="category__item">
                                    <img
                                        src="./img/img1.png"
                                        style={{ borderRadius: "5px" }}
                                        alt=""
                                        className="category_image"
                                    />
                                    <h3 className="category__name">
                                        Xem lịch học
                                    </h3>
                                    <a
                                        href="/schedule"
                                        className="category__details"
                                    >
                                        Xem tại đây
                                    </a>
                                </li>
                            )}
                            {/* column 2 */}
                            {account?.Role === "Teacher" && (
                                <li className="category__item">
                                    <img
                                        src="./img/img2.png"
                                        style={{ borderRadius: "5px" }}
                                        alt=""
                                        className="category_image"
                                    />
                                    <h3 className="category__name">
                                        Nhập điểm
                                    </h3>
                                    <a
                                        href="/grade"
                                        className="category__details"
                                    >
                                        Xem tại đây
                                        <i className="fas fa-long-arrow-alt-right" />
                                    </a>
                                </li>
                            )}
                            {account?.Role === "Parent" && (
                                <li className="category__item">
                                    <img
                                        src="./img/img2.png"
                                        style={{ borderRadius: "5px" }}
                                        alt=""
                                        className="category_image"
                                    />
                                    <h3 className="category__name">Xem điểm</h3>
                                    <a
                                        href="/grade"
                                        className="category__details"
                                    >
                                        Xem tại đây
                                        <i className="fas fa-long-arrow-alt-right" />
                                    </a>
                                </li>
                            )}
                            {/* column 3 */}
                            {account?.Role === "Teacher" && (
                                <li className="category__item">
                                    <img
                                        src="./img/img3.png"
                                        style={{ borderRadius: "5px" }}
                                        alt=""
                                        className="category_image"
                                    />
                                    <h3 className="category__name">
                                        Thông báo
                                    </h3>
                                    <a
                                        href="/noti"
                                        className="category__details"
                                    >
                                        Xem tại đây
                                        <i className="fas fa-long-arrow-alt-right" />
                                    </a>
                                </li>
                            )}
                            {account?.Role === "Parent" && (
                                <li className="category__item">
                                    <img
                                        src="./img/img3.png"
                                        style={{ borderRadius: "5px" }}
                                        alt=""
                                        className="category_image"
                                    />
                                    <h3 className="category__name">
                                        Thông báo
                                    </h3>
                                    <a
                                        href="/noti"
                                        className="category__details"
                                    >
                                        Xem tại đây
                                    </a>
                                </li>
                            )}
                            {/* column 4 */}
                            {account?.Role === "Teacher" && (
                                <li className="category__item">
                                    <img
                                        src="./img/img4.png"
                                        style={{ borderRadius: "5px" }}
                                        alt=""
                                        className="category_image"
                                    />
                                    <h3 className="category__name">Diễn đàn</h3>
                                    <a
                                        href="/forum"
                                        className="category__details"
                                    >
                                        Xem tại đây
                                    </a>
                                </li>
                            )}
                            {account?.Role === "Parent" && (
                                <li className="category__item">
                                    <img
                                        src="./img/img4.png"
                                        style={{ borderRadius: "5px" }}
                                        alt=""
                                        className="category_image"
                                    />
                                    <h3 className="category__name">Diễn đàn</h3>
                                    <a
                                        href="/forum"
                                        className="category__details"
                                    >
                                        Xem tại đây
                                    </a>
                                </li>
                            )}
                        </div>
                    </section>
                </motion.div>
                <motion.div
                    className="card-container"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    variants={cardVariants}
                >
                    <section className="category">
                        <div className="feature__item">
                            <div className="feature__image">
                                <img src="./img/img7.png" alt="" />
                            </div>
                            <div className="feature__info">
                                <h3 className="feature__title">
                                    TẠI SAO CẦN CÓ SỰ LIÊN KẾT
                                </h3>
                                <p className="feature_desc text-clamp text-clamp--2">
                                    Sự ra đời của giáo dục trực tuyến làm giảm
                                    đi sự tương tác giữa học sinh và bạn bè,
                                    chính vì thế phụ huynh và các giáo viên cần
                                    tương tác lẫn nhau để đảm bảo học sinh có
                                    thể kết nối với nhau tốt hơn.
                                </p>
                                <ul className="feature-best__list">
                                    <li className="feature-best__item">
                                        <i className="fa fa-home feature-best__icon"></i>
                                        <h4 className="feature-best__title">
                                            Phát triển toàn diện
                                        </h4>
                                        <p className="feature-best__desc text-clamp text-clamp--2">
                                            Giúp học sinh phát triển toàn diện
                                            kỹ năng của mình
                                        </p>
                                    </li>

                                    <li className="feature-best__item">
                                        <i className="fa fa-home feature-best__icon"></i>
                                        <h4 className="feature-best__title">
                                            Nắm được các thông báo
                                        </h4>
                                        <p className="feature-best__desc text-clamp text-clamp--2">
                                            Phụ huynh và học sinh có thể dễ dàng
                                            nắm bắt được kịp thời các thông báo
                                            của nhà trường
                                        </p>
                                    </li>
                                    <li className="feature-best__item">
                                        <i className="fa fa-home feature-best__icon"></i>
                                        <h4 className="feature-best__title">
                                            Đạt kết quả tốt nhất
                                        </h4>
                                        <p className="feature-best__desc text-clamp text-clamp--2">
                                            Phụ huynh dễ dàng xem điểm con em
                                            mình, dễ dàng quản lí và đôn đốc
                                            tình hình học tập
                                        </p>
                                    </li>
                                    <li className="feature-best__item">
                                        <i className="fa fa-home feature-best__icon"></i>
                                        <h4 className="feature-best__title">
                                            Xây dựng cộng đồng
                                        </h4>
                                        <p className="feature-best__desc text-clamp text-clamp--2">Có một môi trường liên kết mọi người trong trường học lại với nhau, tăng sự gắn kết và hiệu quả trong học tập</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </div>
        </div>
    );
}
