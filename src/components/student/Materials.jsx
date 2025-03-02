import { useState } from "react";
import { Input, Tabs, Card, Button } from "antd";
import { FilePdfOutlined, PlayCircleOutlined, FileTextOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const studyMaterials = {
  pdfs: [
    { title: "Mathematics Basics", link: "#" },
    { title: "Physics Notes", link: "#" },
    { title: "Introduction to Programming", link: "#" },
  ],
  videos: [
    { title: "Algebra Tutorial", link: "#" },
    { title: "Physics Motion Concepts", link: "#" },
    { title: "React.js Crash Course", link: "#" },
  ],
  notes: [
    { title: "History Summary", link: "#" },
    { title: "Economics Key Points", link: "#" },
    { title: "AI & Machine Learning Overview", link: "#" },
  ],
};

export default function StudyMaterials() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filterMaterials = (materials) => {
    return materials.filter((item) => item.title.toLowerCase().includes(search));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-[#1C2D6B] text-center">Study Materials</h1>
      <div className="max-w-2xl mx-auto my-4">
        <Input placeholder="Search materials..." onChange={handleSearch} className="p-2" />
      </div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={<span><FilePdfOutlined /> PDFs</span>} key="1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filterMaterials(studyMaterials.pdfs).map((item, index) => (
              <Card key={index} className="shadow-lg">
                <h3 className="font-semibold">{item.title}</h3>
                <Button type="primary" className="mt-2" href={item.link} target="_blank">Download</Button>
              </Card>
            ))}
          </div>
        </TabPane>
        <TabPane tab={<span><PlayCircleOutlined /> Videos</span>} key="2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filterMaterials(studyMaterials.videos).map((item, index) => (
              <Card key={index} className="shadow-lg">
                <h3 className="font-semibold">{item.title}</h3>
                <Button type="primary" className="mt-2" href={item.link} target="_blank">Watch</Button>
              </Card>
            ))}
          </div>
        </TabPane>
        <TabPane tab={<span><FileTextOutlined /> Notes</span>} key="3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filterMaterials(studyMaterials.notes).map((item, index) => (
              <Card key={index} className="shadow-lg">
                <h3 className="font-semibold">{item.title}</h3>
                <Button type="primary" className="mt-2" href={item.link} target="_blank">View</Button>
              </Card>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
