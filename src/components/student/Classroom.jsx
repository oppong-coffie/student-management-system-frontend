import { Button, Card } from "antd";
import { VideoCameraOutlined, ClockCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";

export default function JoinClassroom() {
  const classes = [
    { id: 1, title: "Mathematics 101", time: "10:00 AM - 11:30 AM", live: true },
    { id: 2, title: "Physics: Motion & Forces", time: "12:00 PM - 1:30 PM", live: false },
    { id: 3, title: "History of Ancient Civilizations", time: "2:00 PM - 3:30 PM", live: false },
    { id: 4, title: "Computer Science: Algorithms", time: "4:00 PM - 5:30 PM", live: true },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-[#1C2D6B] mb-6 text-center">Join Classroom</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id} className="shadow-lg rounded-lg text-center p-6 border-t-4 border-[#FFD700]">
            <h2 className="text-lg font-semibold mb-2">{cls.title}</h2>
            <p className="text-gray-500 flex items-center justify-center gap-2">
              <ClockCircleOutlined /> {cls.time}
            </p>
            <Button
              className="mt-4 w-full bg-[#1C2D6B] text-white hover:bg-[#FFD700] transition"
              icon={cls.live ? <VideoCameraOutlined /> : <PlayCircleOutlined />}
            >
              {cls.live ? "Join Live Class" : "Watch Recording"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
