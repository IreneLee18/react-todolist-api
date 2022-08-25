function Tab({currentTab, setCurrentTab }) {
  const tab = [
    {
      id: "all",
      type: "全部",
    },
    {
      id: "undone",
      type: "待完成",
    },
    {
      id: "done",
      type: "已完成",
    },
  ];
  return (
    <>
      {tab.map((item) => (
        <li
          key={item.id}
          className={item.id === currentTab ? "currentTab" : ""}
          id={item.id}
          onClick={() => setCurrentTab(item.id)}
        >
          {item.type}
        </li>
      ))}
    </>
  );
}
export default Tab;