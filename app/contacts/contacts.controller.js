angular.module('myApp')
    .controller('ContactsController', ContactsController);

function ContactsController(contactsStore) {
    var vm = this;
    vm.filterData = '';
    vm.newContactModel = {name: '', birthday: ''};
    vm.editContactModel = {name: '', birthday: ''};
    vm.editEnabled = false;
    vm.errorMessage = contactsStore.errorMessage;

    vm.addContact = addContact;
    vm.deleteContact = deleteContact;
    vm.editContact = editContact;
    vm.saveContactChanges = saveContactChanges;
    vm.filter = filter;

    activate();

    function activate() {
        contactsStore.init().then(function () {
            vm.errorMessage = contactsStore.errorMessage;
            vm.contacts = contactsStore.contacts.data;
        });
    }

    function addContact() {
        contactsStore.createContact(vm.newContactModel).then(function () {
            vm.errorMessage = contactsStore.errorMessage;
        });
    }

    function deleteContact(contactId) {
        contactsStore.removeContact(contactId).then(function () {
            vm.errorMessage = contactsStore.errorMessage;
        });
    }

    function editContact(contact) {
        vm.editEnabled = true;
        Object.assign(vm.editContactModel, contact);
    }

    function saveContactChanges() {
        contactsStore.updateContact(vm.editContactModel).then(function (contactToUpdate) {
            Object.assign(contactToUpdate, vm.editContactModel);
            vm.errorMessage = contactsStore.errorMessage;
        });
    }

    function filter() {
        vm.contacts = contactsStore.filterContacts(vm.filterData);
    }

}
