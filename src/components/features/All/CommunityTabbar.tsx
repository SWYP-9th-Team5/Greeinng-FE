import { useTabStore } from '@/stores/useTabStore';

export const TabComponent = () => {
  const tabs = ['QnA', '자유게시판', '나눔'];
  const { activeTab, setActiveTab } = useTabStore();

  return (
    <div className="mb-4 flex items-center gap-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`title2 inline-flex items-center pb-1 text-center whitespace-nowrap ${
            activeTab === tab
              ? 'text-secondary border-secondary border-b-2'
              : 'text-[#666]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
