angular.module('myApp')
    .controller('ContactsController', ContactsController);

function ContactsController(contactsStore) {
    var vm = this;
    vm.filterData = '';
    vm.newContactModel = {name: '', birthday: ''};
    vm.editContactModel = {name: '', birthday: ''};
    vm.editEnabled = false;
    vm.errorMessage = '';

    vm.addContact = addContact;
    vm.deleteContact = deleteContact;
    vm.editContact = editContact;
    vm.saveContactChanges = saveContactChanges;
    vm.filter = filter;

    activate();

    function activate() {
        contactsStore.init().then(function (result) {
            if (result.status !== 200) {
                vm.errorMessage = result.statusText;
                return;
            }
            vm.contacts = contactsStore.contacts.data;
        });
    }

    function addContact() {
        contactsStore.createContact(vm.newContactModel).then(function (result) {
            if (result.status !== 201) {
                vm.errorMessage = result.statusText;
                return;
            }
            contactsStore.addNewContact(vm.newContactModel, result.data);
        });
    }

    function deleteContact(contactId) {
        contactsStore.removeContact(contactId).then(function (result) {
            if (result.status !== 200) {
                vm.errorMessage = result.statusText;
                return;
            }
            contactsStore.removeContactById(contactId);
        });
    }

    function editContact(contact) {
        vm.editEnabled = true;
        Object.assign(vm.editContactModel, contact);
    }

    function saveContactChanges() {
        contactsStore.updateContact(vm.editContactModel).then(function (result) {
            if (result.status !== 200) {
                vm.errorMessage = result.statusText;
                return;
            }
            Object.assign(contactsStore.getUpdatedContactData(vm.editContactModel.id), vm.editContactModel);
        });
    }

    function filter() {
        vm.contacts = contactsStore.filterContacts(vm.filterData);
    }

}
