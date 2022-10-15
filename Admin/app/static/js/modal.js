const showModal = (modalTitle, modalContentElem, modalFooterElem, modalWidth, modalHeight) => {
    createWrapper();
    createModal(modalTitle, modalContentElem, modalFooterElem, modalWidth, modalHeight);
};

const createWrapper = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'modal-wapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = '0';
    wrapper.style.bottom = '0';
    wrapper.style.left = '0';
    wrapper.style.right = '0';
    wrapper.style.backgroundColor = '#0000008c';
    wrapper.style.zIndex = 2;
    document.body.appendChild(wrapper);
};

const createModal = (title, modalContentElem, modalFooterElem, modalWidth, modalHeight) => {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.style.position = 'absolute';
    modalContainer.style.top = '0';
    modalContainer.style.bottom = '0';
    modalContainer.style.left = '0';
    modalContainer.style.right = '0';
    modalContainer.style.zIndex = 3;
    modalContainer.style.display = 'flex';
    modalContainer.style.alignItems = 'center';
    modalContainer.style.justifyContent = 'center';

    const modal = document.createElement('div');
    const modalTitle = document.createElement('div');
    modalTitle.textContent = title;
    modalTitle.style.fontSize = '30px';
    modalTitle.style.padding = '15px 20px';
    modalTitle.style.textShadow = '2px 1px #959393';
    modal.appendChild(modalTitle);
    modal.appendChild(modalContentElem);
    modalFooterElem.style.position = 'absolute';
    modalFooterElem.style.bottom = '5px';
    modalFooterElem.style.left = '5px';
    modalFooterElem.style.right = '5px';
    modalFooterElem.style.padding = '10px';
    modal.appendChild(modalFooterElem);
    modal.appendChild(createCloseIcon());
    modal.style.position = 'relative';
    modal.style.width = modalWidth;
    modal.style.height = modalHeight;
    modal.style.backgroundColor = '#fff';
    modal.style.borderRadius = '15px';
    modalContainer.appendChild(modal);
    document.body.appendChild(modalContainer);
};

const createCloseIcon = () => {
    const icon = document.createElement('div');
    icon.textContent = '×'; 
    icon.style.position = 'absolute';
    icon.style.top = '15px';
    icon.style.right = '15px';
    icon.style.fontSize = '30px';
    icon.style.width = '30px';
    icon.style.height = '30px';
    icon.style.display = 'flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
    icon.style.backgroundColor = '#505050';
    icon.style.color = '#fff';
    icon.style.borderRadius = '20px';
    icon.style.cursor = 'pointer';
    icon.style.boxShadow = '2px 2px 10px #545252';
    icon.addEventListener('click', () => closeModal());
    return icon;
};

const closeModal = () => {
    document.querySelector('.modal-wapper').remove();
    document.querySelector('.modal-container').remove();
};