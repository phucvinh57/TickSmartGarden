const mockDeviceInfo = {
  name: 'Máy bơm 1',
  processingTime: 3,
  timeUnit: 'Phút',
}

const mockSchedList = [
  {
    name: "Bơm sáng 1",
    timestamp: new Date(),
    cycle: 1,
    cycleUnit: "ngày",
  },
  // cycle: "8:00 mỗi ngày",
  {
    name: "Bơm trưa 1",
    cycle: "13:00 mỗi 3 ngày",
  },
  {
    name: "Bơm chiều 1",
    cycle: "18:00 mỗi ngày",
  },
  {
    name: "Bơm sáng 2",
    cycle: "8:00 mỗi ngày",
  },
  {
    name: "Bơm trưa 2",
    cycle: "13:00 mỗi 3 ngày",
  },
  {
    name: "Bơm chiều 2",
    cycle: "18:00 mỗi ngày",
  },
  {
    name: "Bơm sáng 3",
    cycle: "8:00 mỗi ngày",
  },
  {
    name: "Bơm trưa 3",
    cycle: "13:00 mỗi 3 ngày",
  },
  {
    name: "Bơm chiều 3",
    cycle: "18:00 mỗi ngày",
  },
];

const mockPolicyList = [
  {
    name: "Rửa bụi",
    turnOn: true,
    action: "Bật máy bơm",
  },
  {
    name: "Giải hạn hè",
    action: "Bật máy bơm",
  },
  {
    name: "Giải hạn đông",
    action: "Bật đèn",
  },
  {
    name: "Cấp oxy",
    action: "Bật máy bơm",
  },
];

const mockLogList = [
  {
    time: "11h00 22/11/2022",
    activity: "Bật công tắt máy bơm",
  },
  {
    time: "11h00 21/11/2022",
    activity: "Máy bơm bật từ lịch hẹn Bơm sáng",
  },
  {
    time: "11h00 20/11/2022",
    activity: "Máy bơm bật từ chính sách Làm ấm",
  },
  {
    time: "11h00 22/11/2022",
    activity: "Bật công tắt máy bơm",
  },
  {
    time: "11h00 21/11/2022",
    activity: "Máy bơm bật từ lịch hẹn Bơm sáng",
  },
  {
    time: "11h00 20/11/2022",
    activity: "Máy bơm bật từ chính sách Làm ấm",
  },
  {
    time: "11h00 22/11/2022",
    activity: "Bật công tắt máy bơm",
  },
  {
    time: "11h00 21/11/2022",
    activity: "Máy bơm bật từ lịch hẹn Bơm sáng",
  },
]

module.exports.mockSchedList = mockSchedList
module.exports.mockPolicyList = mockPolicyList
module.exports.mockLogList = mockLogList