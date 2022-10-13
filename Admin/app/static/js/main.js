const CORPORATE_LIST_ENDPOINT = 'get_corporate_list';
const CREATE_CORPORATE_ENDPOINT = 'create_corporate';

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
        const row = generateCorporateListRowElement(corporate.corporate_id, corporate.corporate_unique_name,corporate.corporate_name,corporate.db_name);
        content.appendChild(row);
    });
};

const generateCorporateListRowHeaderElement = () => {
    const row = document.createElement('div');
    row.className = 'corporate-row-header';
    row.appendChild(generateDiv('','corporate-row-id', '企業ID'));
    row.appendChild(generateDiv('','corporate-row-unique-name', '企業UniqueID'));
    row.appendChild(generateDiv('','corporate-row-name', '企業名'));
    row.appendChild(generateDiv('','corporate-row-db-name', 'DB名'));
    return row;
};

const generateCorporateListRowElement = (id, uniqueName, name, dbName) => {
    const row = document.createElement('div');
    row.className = 'corporate-row';
    row.appendChild(generateDiv('','corporate-row-id', id));
    row.appendChild(generateDiv('','corporate-row-unique-name', uniqueName));
    row.appendChild(generateDiv('','corporate-row-name', name));
    row.appendChild(generateDiv('','corporate-row-db-name', dbName));
    return row;
};

const showCreateCorporateModal = () => {
    const MODAL_NAME = '新規企業作成';
    const contentElem = document.createElement('div');
    contentElem.className = '';

    const corporateUniqueNameText = document.createElement('input');
    corporateUniqueNameText.id = 'corporate_unique_id';
    corporateUniqueNameText.placeholder = '企業UniqueID';
    contentElem.appendChild(corporateUniqueNameText);

    const corporateNameText = document.createElement('input');
    corporateNameText.id = 'corporate_name';
    corporateNameText.placeholder = '企業名';
    contentElem.appendChild(corporateNameText);

    const footerElem = document.createElement('div');
    footerElem.className = '';
    const updateBtn = document.createElement('button');
    updateBtn.textContent = '登録';
    updateBtn.addEventListener('click', async () => {
        if (IsEmpty(corporateUniqueNameText.value) || IsEmpty(corporateNameText.value)) {
            alert('入力は必須です。/nすべて入力してください。');
            return;
        }
        console.log(corporateUniqueNameText.value);
        console.log(corporateNameText.value);
        const res = await postConnect({'corporate_unique_name': corporateUniqueNameText.value, 'corporate_name': corporateNameText.value}, CREATE_CORPORATE_ENDPOINT);
        console.log(res);
    });

    footerElem.appendChild(updateBtn);

    showModal(MODAL_NAME, contentElem, footerElem, '600px', 'calc(100% - 200px)');
};

window.addEventListener('DOMContentLoaded', () => {
    setCorporateList();
    document.querySelector('#btnAddCorporate').addEventListener('click', () => {
        showCreateCorporateModal();
    });
})