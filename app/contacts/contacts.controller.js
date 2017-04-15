angular.module('myApp')
    .controller('ContactsController', ContactsController);

function ContactsController(contactsStore) {
    var vm = this;
    vm.filterData = '';
    vm.newContactModel = {name: '', birthday: ''};
    vm.editContactModel = {name: '', birthday: ''};
    vm.editEnabled = false;
    vm.errorMessage = '';

    Object.assign(vm, {
        addContact: function () {
            contactsStore.createContact(vm.newContactModel).then(function (result) {
                if (result.status !== 201) {
                    vm.errorMessage = result.statusText;
                    return;
                }
                vm.newContactModel.id = result.data;
                vm.contacts.push(vm.newContactModel);
            });
        },
        deleteContact: function (contactId) {
            contactsStore.removeContact(contactId).then(function (result) {
                if (result.status !== 200) {
                    vm.errorMessage = result.statusText;
                    return;
                }
                const contactIdToDelete = vm.contacts.indexOf(vm.contacts.find(function (contact) {
                    return contact.id === contactId;
                }));
                vm.contacts.splice(contactIdToDelete, 1);
            });

        },
        editContact: function (contact) {
            vm.editEnabled = true;
            Object.assign(vm.editContactModel, contact);
        },
        saveContactChanges: function () {
            contactsStore.updateContact(vm.editContactModel).then(function (result) {
                if (result.status !== 200) {
                    vm.errorMessage = result.statusText;
                    return;
                }
                const contactToEdit = vm.contacts.find(function (contact) {
                    return contact.id === vm.editContactModel.id;
                });
                Object.assign(contactToEdit, vm.editContactModel);
            });
        },
        filter : function () {
            vm.contacts = vm.filterData ? vm.contacts.filter(function (contact) {
                return contact.name.includes(vm.filterData);
            }) : contactsStore.contacts.data;
        }

    });

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

}
