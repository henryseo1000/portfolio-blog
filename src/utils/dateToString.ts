const dateToString = (dateString : string) => {
    const date = new Date(dateString);

    return date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일 " + (date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":") + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
}

export default dateToString;