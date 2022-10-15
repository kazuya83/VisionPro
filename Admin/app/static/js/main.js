const CORPORATE_LIST_ENDPOINT = 'get_corporate_list';
const CREATE_CORPORATE_ENDPOINT = 'create_corporate';
const DB_UPGRADE_ENDPOINT = 'db_upgrade';
const GET_ATTACH_TABLE_LIST_ENDPOINT = 'get_attach_table_list';
const CREATE_CORPORATE_DB_ENDPOINT = 'create_corporate_db';

const getCorporateList = async () => {
    const param = {};
    const res = await postConnect(param, CORPORATE_LIST_ENDPOINT);
    return res.corporate_list ?? [];
};

const setCorporateList = async () => {
    const content = document.querySelector('.main-content');
    removeAllChildren(content);
    content.appendChild(generateCorporateListRowHeaderElement());

    const corporateList = await getCorporateList();
    if (corporateList.length === 0) { return; }

    corporateList.forEach(corporate => {
        const row = generateCorporateListRowElement(corporate.no, corporate.corporate_id, corporate.corporate_unique_name,corporate.corporate_name,corporate.db_name);
        content.appendChild(row);
    });
};

const generateCorporateListRowHeaderElement = () => {
    const row = document.createElement('div');
    row.className = 'corporate-row-header';
    row.appendChild(generateDiv('','corporate-row-no', 'No'));
    row.appendChild(generateDiv('','corporate-row-id', '企業ID'));
    row.appendChild(generateDiv('','corporate-row-unique-name', '企業UniqueID'));
    row.appendChild(generateDiv('','corporate-row-name', '企業名'));
    row.appendChild(generateDiv('','corporate-row-db-name', 'DB名'));
    row.appendChild(generateDiv('','corporate-row-db-upgrade', 'DB Attach'));
    return row;
};

const generateCorporateListRowElement = (no, id, uniqueName, name, dbName) => {
    const row = document.createElement('div');
    row.className = 'corporate-row';
    row.appendChild(generateDiv('','corporate-row-no', no));
    row.appendChild(generateDiv('','corporate-row-id', id));
    row.appendChild(generateDiv('','corporate-row-unique-name', uniqueName));
    row.appendChild(generateDiv('','corporate-row-name', name));
    row.appendChild(generateDiv('','corporate-row-db-name', dbName ?? '-'));
    const attachDetail = generateDiv('','corporate-row-db-upgrade', '詳細');
    attachDetail.addEventListener('click', () => { showDBUpgradeAttachInfoModal(id); });
    row.appendChild(attachDetail);
    return row;
};

const showCreateCorporateModal = async () => {
    const MODAL_NAME = '新規企業作成';
    const contentElem = document.createElement('div');
    contentElem.className = '';

    const createRowForm = (id, placeholder) => {
        const formRowContainer = document.createElement('div');
        formRowContainer.style.display = 'flex';
        formRowContainer.style.alignItems = 'center';
        formRowContainer.style.margin = '20px';

        const formRowLabel = document.createElement('div');
        formRowLabel.textContent = placeholder;
        formRowLabel.style.width = '150px';
        formRowContainer.appendChild(formRowLabel);

        const formRowInput = document.createElement('input');
        formRowInput.id = id;
        formRowInput.placeholder = placeholder;
        formRowInput.style.width = 'calc(100% - 200px)';
        formRowInput.style.height = '35px';
        formRowInput.style.fontSize = '20px';
        formRowInput.style.border = 'none';
        formRowInput.style.borderBottom = '1px solid';
        formRowContainer.appendChild(formRowInput);

        contentElem.appendChild(formRowContainer);
    };

    createRowForm('corporate_unique_id', '企業UniqueID');
    createRowForm('corporate_name', '企業名');

    const footerElem = document.createElement('div');
    footerElem.className = '';
    footerElem.style.textAlign = 'right';
    const updateBtn = document.createElement('button');
    updateBtn.className = 'btn-primary';
    updateBtn.textContent = '登録';
    updateBtn.addEventListener('click', async () => {
        const corporateUniqueNameText = document.querySelector('#corporate_unique_id');
        const corporateNameText = document.querySelector('#corporate_name');
        if (IsEmpty(corporateUniqueNameText.value) || IsEmpty(corporateNameText.value)) {
            alert('入力は必須です。すべて入力してください。');
            return;
        }

        if (!confirm('登録しますが、本当に良いですか？')) { return; }
        resetLog();
        closeModal();
        const res = await postConnect({'corporate_unique_name': corporateUniqueNameText.value, 'corporate_name': corporateNameText.value}, CREATE_CORPORATE_ENDPOINT);
        if (res && res.next_upgrade_num > 0) {
            const corporateId = res.corporate_id;
            const nextUpgradeNum = res.next_upgrade_num;
            renderLog(`企業ID:${corporateId}`);
            renderLog(`企業UniqueID:${corporateUniqueNameText.value}`);
            renderLog(`企業名:${corporateNameText.value}`);
            renderLog('DBの作成に成功しました');
            dbUpgrade(corporateId, nextUpgradeNum);
        }
    });
    footerElem.appendChild(updateBtn);
    showModal(MODAL_NAME, contentElem, footerElem, '600px', 'calc(100% - 200px)');
};

const showDBUpgradeAttachInfoModal = async (corporateId) => {
    const MODAL_NAME = 'DB Attach詳細';

    const contentElem = document.createElement('div');
    contentElem.className = '';
    contentElem.style.padding = '25px';
    const param = {corporate_id: corporateId};
    const res = await postConnect(param, GET_ATTACH_TABLE_LIST_ENDPOINT);

    const headerRow = document.createElement('div');
    headerRow.style.display = 'flex';
    headerRow.style.fontSize = '20px';
    headerRow.style.fontWeight = 'bold';
    headerRow.style.backgroundColor = '#7373fc';
    headerRow.style.color = '#fff';
    headerRow.style.padding = '10px';
    const tableNameHeader = document.createElement('div');
    tableNameHeader.textContent = 'テーブル名';
    tableNameHeader.style.flex = '1';
    headerRow.appendChild(tableNameHeader);
    const tableAttachHeader = document.createElement('div');
    tableAttachHeader.textContent = 'Attach済';
    tableAttachHeader.style.width = '200px';
    tableAttachHeader.style.textAlign = 'center';
    headerRow.appendChild(tableAttachHeader);
    contentElem.appendChild(headerRow);
    
    res.table_list.forEach(table => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.margin = '10px 0';
        row.style.padding = '10px';

        const tableName = document.createElement('div');
        tableName.textContent = table.table_name;
        tableName.style.flex = '1';

        row.appendChild(tableName);
        
        const tableAttach = document.createElement('div');
        tableAttach.textContent = table.is_attach ? '◯' : '×';
        tableAttach.style.width = '200px';
        tableAttach.style.textAlign = 'center';
        if (!table.is_attach) { tableAttach.style.color = 'red'; }
        row.appendChild(tableAttach);

        contentElem.appendChild(row);
    });

    const footerElem = document.createElement('div');
    footerElem.className = '';
    footerElem.style.textAlign = 'right';
    const upgradeBtn = document.createElement('button');
    upgradeBtn.className = 'btn-primary';
    upgradeBtn.textContent = 'DBUpgrade';
    upgradeBtn.addEventListener('click', async () => {
        closeModal();
        resetLog();
        await createDBAndDbUpgrade(corporateId);
        setCorporateList();
    });
    footerElem.appendChild(upgradeBtn);

    showModal(MODAL_NAME, contentElem, footerElem, '600px', 'calc(100% - 200px)');
};

const createDBAndDbUpgrade = async (corporateId) => {
    const param = { corporate_id: corporateId };
    const upgradeRes = await postConnect(param, CREATE_CORPORATE_DB_ENDPOINT);
    resetLog();
    renderLog(upgradeRes.message);
    await dbUpgrade(corporateId, upgradeRes.next_upgrade_num, false);
};

const dbUpgrade = async (corporateId, nextUpgradeNum, isReload = true) => {
    const upgradeRes = await postConnect({'corporate_id': corporateId, 'next_upgrade_num': nextUpgradeNum}, DB_UPGRADE_ENDPOINT);
    renderLog(upgradeRes.message);
    if (upgradeRes && upgradeRes.next_upgrade_num > 0) {
        const corporateId = upgradeRes.corporate_id;
        const nextUpgradeNum = upgradeRes.next_upgrade_num;
        setTimeout(() => {
            dbUpgrade(corporateId, nextUpgradeNum);
        }, 50)
        return;
    }
    if (isReload) {
        setCorporateList();
    }  
};

const allUpgrade = async () => {
    const corporateList = await getCorporateList();
    corporateList.forEach(corporate => {
        const func = async () => {
            await createDBAndDbUpgrade(corporate.corporate_id);
        };
        func();
    });
    setCorporateList();
};

const renderLog = (message) => {
    const logContent = document.querySelector('.log-content');
    const newLog = document.createElement('div');
    newLog.textContent = message;
    logContent.appendChild(newLog);

    const _ = document.createElement('div');
    _.style.width = '10px';
    _.style.height = '5px';
    logContent.appendChild(_);
};

const resetLog = () => {
    const logContent = document.querySelector('.log-content');
    removeAllChildren(logContent);
};

window.addEventListener('DOMContentLoaded', () => {
    setCorporateList();
    document.querySelector('#btnAllUpgrade').addEventListener('click', () => {
        allUpgrade();
    });
    document.querySelector('#btnAddCorporate').addEventListener('click', () => {
        showCreateCorporateModal();
    });
})