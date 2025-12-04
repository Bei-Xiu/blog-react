import './UserPanel.css'; 

const UserPanel = () => {
  const personalphoto = '/blog-react/images/personalphoto.jpg'; 

  return (
    <div className="user-panel">
      <h3 className="panel-title">個人檔案</h3>
      <div className="avatar-container">
        <img src={personalphoto} alt="User Avatar" className="user-avatar" />
      </div>
      <div className="profile-info">
        <p>您好，我是Berry。</p>
        <p>我本身是機械工程系畢業，但在研究所期間因研究需求開始接觸程式開發，並參與 MES 的設計與實作。從那時起，我對軟體開發產生了濃厚興趣，也正式開啟了我的程式之路。</p>
        <p>建立這個部落格的目的，是想記錄自己在學習與工作過程中累積的知識，以及一路以來參與過的各項專案。</p>
        <p>如果你／妳也在這條學習的道路上，不必在意是否出身本科，只要持續努力，相信有一天一定能走出屬於自己的舞台。</p>
        <div className="social-links">
          <a href="https://github.com/bei-xiu" className="link-item">GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;