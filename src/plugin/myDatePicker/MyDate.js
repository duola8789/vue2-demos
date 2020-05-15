/**
 * Created By zh on 2019-06-17
 */

/**
 * 格式化日期
 * @param   { Date }    date        传入一个日期对象
 * @returns { string }  dateString  返回格式化后的日期字符串
 */
const format = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() > 10 ? `${dateObj.getMonth() + 1}` : `0${dateObj.getMonth() + 1}`;
  const day = dateObj.getDate() > 9 ? `${dateObj.getDate()}` : `0${dateObj.getDate()}`;
  return `${year}-${month}-${day}`;
};

export default class MyDate {
  constructor() {
    // 当前日期
    const date = new Date();
    const year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate();

    // 表头
    this.weeks = ['日', '一', '二', '三', '四', '五', '六'];

    // 当前选择的日期
    this.current = {
      year,
      month
    };

    // 输入日期
    this.dates = [];

    // 今天
    this.today = new Date(year, month - 1, day);

    this.getDateArray();
  }

  // 改变日期
  changeDate(date = new Date()) {
    this.current = {
      year: date.getFullYear(),
      month: date.getMonth() + 1
    };
    this.getDateArray();
  }

  // 获得当前日期数组
  getDateArray() {
    this.dates = [];

    // 当前选择日期所在月的第一天及这一天是星期几
    const firstDayOfCurrentMonth = new Date(this.current.year, this.current.month - 1);
    const firstDayOfWeek = firstDayOfCurrentMonth.getDay();

    // 内层遍历起始点
    let weekLoopStart = -firstDayOfWeek + 1;

    // 行数据
    for (let row = 0; row < 6; row++) {
      const rowDate = [];
      // 列数据
      for (let weekDay = weekLoopStart; weekDay <= 7 + weekLoopStart - 1; weekDay++) {
        const targetDate = new Date(this.current.year, this.current.month - 1, weekDay);
        const day = targetDate.getDate();
        const month = targetDate.getMonth() + 1;
        rowDate.push({
          date: targetDate,
          value: format(targetDate),
          label: day,
          key: weekDay,
          isCurrentMonth: month === this.current.month,
          isToday: +targetDate === +this.today
        });
      }
      weekLoopStart += 7;
      this.dates.push(rowDate);
    }
  }
}
