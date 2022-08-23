function Tab({ tab, currentTab, setCurrentTab }) {
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