export const getUser = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    return users;
};

export const getStudent = () => {
    const students = JSON.parse(localStorage.getItem("students"));
    return students;
};

export const getSubject = () => {
    const subjects = JSON.parse(localStorage.getItem("subjects"));
    return subjects;
};

export const getNotification = () => {
    const notifications = JSON.parse(localStorage.getItem("notifications"));
    return notifications;
};

export const getPost = () => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    return posts;
};
