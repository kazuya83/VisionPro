const NAVIGATION_ID = 1;
const TAB_LIST = [
    { tab_id: NAVIGATION_ID, tab_name: 'タブ設定' }
];

const setTabList = () => {
    const container = document.querySelector('.left-content');
    TAB_LIST.forEach(tab => {
        const row = document.createElement('div');
        row.id = `tab_${tab.tab_id}`;
        row.textContent = tab.tab_name;
        row.style.cursor = 'pointer';
        row.style.fontWeight = '';
        container.appendChild(row);

        row.addEventListener('click', () => {
            row.style.fontWeight = 'bold';
            switch(tab.tab_id) {
                case NAVIGATION_ID:
                    setNavigationContainaer();
                    break;
            }
        });
    });
};

const setNavigationContainaer = () => {
    const container = document.querySelector('.right-content');
    removeAllChildren(container);

    const res = postConnect({ corporate_id: getCorporateId() }, 'get_corporate_navigation_list');
    const generateRow = (navigationId, navigationName, navigationFlag, navigationSwitchBtnElem, rowClass='') => {
        const row = document.createElement('div');
        row.className = rowClass;
        container.appendChild(row);

        const navigationIdElem = document.createElement('div');
        navigationIdElem.className =  'navigation-id';
        navigationIdElem.textContent = navigationId;
        row.appendChild(navigationIdElem);

        const navigationNameElem = document.createElement('div');
        navigationNameElem.className = 'navigation-name';
        navigationNameElem.textContent = navigationName;
        row.appendChild(navigationNameElem);

        const navigationFlagElem = document.createElement('div');
        navigationFlagElem.className = 'navigation-flag';
        navigationFlagElem.textContent = navigationFlag;
        row.appendChild(navigationFlagElem);

        const navigationSwitchElem = document.createElement('div');
        navigationSwitchElem.className = 'navigation-switch';
        navigationSwitchElem.appendChild(navigationSwitchBtnElem);
        row.appendChild(navigationSwitchElem);
    };

    const navigationRowClassName = 'navigation-row';

    const navigationSwitchHeader = generateDiv('', '', '');
    generateRow('タブID', 'タブ名', '表示/非表示', navigationSwitchHeader, `${navigationRowClassName} ${navigationRowClassName}-header`);

    const navigationList = res.corporate_list;
    navigationList.forEach(navigation => {
        const isDisplayStr = navigation.is_deleted ? '非表示' : '表示';
        const rowClassName = `${navigationRowClassName} ${(navigation.is_deleted ? `${navigationRowClassName}-hidden` : '')}`;

        const siwtchBtn = document.createElement('button');
        siwtchBtn.textContent = '切替';
        siwtchBtn.addEventListener('click', () => {
            const nextIsDeleted = navigation.is_deleted ? '0' : '1';
            const res = postConnect({ corporate_id: getCorporateId(), navigation_id: navigation.navigation_id, is_deleted: nextIsDeleted }, 'update_corporate_navigation_is_deleted')
            setNavigationContainaer();
        });
        generateRow(navigation.navigation_id, navigation.navigation_name, isDisplayStr, siwtchBtn, rowClassName);
    });
};

const getCorporateId = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('corporate_id');
};

window.addEventListener('DOMContentLoaded', () => {
    setTabList();
});