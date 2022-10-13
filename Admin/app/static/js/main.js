const CORPORATE_LIST_ENDPOINT = 'get_corporate_list';

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

window.addEventListener('DOMContentLoaded', () => {
    setCorporateList();
})